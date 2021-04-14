import  ApiError from'../error/ApiError.js';
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken'
import { userModel } from "../database/database.js";

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async singin(req, res, next) {
      const { email, password, first_name, last_name } = req.body;
        const candidate = await userModel.findOne({ email })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
          const hashPassword = await bcrypt.hash(password, 10)
          const newUser = await new userModel({
            email,
            password: hashPassword,
            first_name,
            last_name,
            events: [],
            places: [],
            friends: [],
          });
          await newUser.save();
          const token = generateJwt(newUser._id, newUser.email)
          return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user._id, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email )
        return res.json({token})
    }
}

export default new UserController()
