const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  role: {
    type: String,
     default: "user"
  },
  favs_ar: {
    type: Array,
     default: [] 
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  profileColor:{
    type:String,
    default:"#28a745"
  }
}, { timestamps: true });

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (user_id, role = "user") => {
  const token = jwt.sign({ _id: user_id, role }, config.TOKEN_SECRET, { expiresIn: "540mins" })
  return token;
}


exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).email().required(),
    password: Joi.string().min(3).max(100).required()
  })
  return joiSchema.validate(_reqBody);
}


exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(3).max(100).email().required(),
    password: Joi.string().min(3).max(100).required()
  })

  return joiSchema.validate(_reqBody);
} 


exports.validateChangePassword = (_reqBody) => {
  const joiSchema = Joi.object({
    password: Joi.string().min(3).max(100).required()
  })

  return joiSchema.validate(_reqBody);
} 