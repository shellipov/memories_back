import uuid from "uuid";
import path from "path";
import fs from "fs";
import { photoModel } from "../database/database.js";
import ApiError from "../error/ApiError.js";

// const getUserEmail = (token) => {
//   return jwt.decode(token).email;
// };

class EventController {
  async getAll(req, res, next) {
    try {
      const { id } = req.params;
      const photos = await photoModel.find({ eventID: id });
      return res.json(photos);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const { creator, eventID, description } = req.body;
      let images = req.files.img;
      if (images.name) {
        images = [images];
      }
      await Promise.all(
        images.map(async (img) => {
          const oldFileName = img.name;
          const from = oldFileName.indexOf('.')
          const extension = oldFileName.slice(from, oldFileName.length);
          console.log(extension);
          // const fileName = uuid.v4() + ".jpg";
          const fileName = uuid.v4() + extension;
          img.mv(path.resolve("./", "static", fileName));
          const newPhoto = await new photoModel({
            creator,
            eventID,
            title: oldFileName,
            description,
            img: fileName,
          });
          await newPhoto.save();
          return newPhoto;
        })
      ).then((resp) => {
        res.json(resp);
      });
      return;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const event = await photoModel.findOne({ _id: id });
      return res.json(event);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const delEvent = await photoModel.findOneAndDelete({ _id: id });
      const fileName = delEvent.img;
      fs.unlink(`./static/${fileName}`, (err) => {
        if (err) {
          next(ApiError.badRequest(err.message));
          return;
        }
      });
      return res.json(delEvent._id);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const photo = req.body;
      const newPhoto = await photoModel.findOneAndUpdate(
        {
          _id: id,
        },
        photo,
        { new: true }
      );
      return res.json(newPhoto);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new EventController();
