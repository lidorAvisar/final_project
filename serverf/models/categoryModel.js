const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
name:String,
url_name:String,
})
exports.CategoryModel = mongoose.model("categories",schema)

exports.validateCategories = (_reqBody) => {
const joiSchema = Joi.object({
name:Joi.string().min(3).max(100).required(),
url_name:Joi.string().min(3).max(100).required(),
})
return joiSchema.validate(_reqBody)
}