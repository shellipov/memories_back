import jwt from "jsonwebtoken";
import { eventModel } from "../database/database.js";
import ApiError from "../error/ApiError.js";

const getUserEmail = (token) => {
  return jwt.decode(token).email;
};

class EventController {
  async getAll(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userEmail = getUserEmail(token);
      const events = await eventModel.find({ creator: userEmail });
      const sortEvents = events.sort((a, b) => {
        return a.date.replace(/-/g, "") - b.date.replace(/-/g, "");
      });
      return res.json(sortEvents);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userEmail = getUserEmail(token);
      const newEvent = await new eventModel({
        ...req.body,
        creator: userEmail,
      });
      await newEvent.save();
      return res.json(newEvent);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const delEvent = await eventModel.findOneAndDelete({ _id: id });
      return res.json(delEvent._id);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const event = await eventModel.findOne({ _id: id });
      return res.json(event);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const renewEvent = req.body;
      const event = await eventModel.findOneAndUpdate(
        {
          _id: id,
        },
        renewEvent,
        { new: true }
      );
      return res.json(event);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new EventController();
