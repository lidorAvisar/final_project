const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    name: String,
    price: Number,
    sale_price: {
        type: Number,
        default: -1
    },
    category_url: String,
    image: String,
}, { timestamps: true })


exports.ProductModel = mongoose.model("products", schema)

exports.validateProduct = (_reqBody) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(1).max(9999).required(),
        sale_price: Joi.number().min(-1).max(9999).required(),
        category_url: Joi.string().min(3).max(100).required(),
        image: Joi.string().min(2).max(2000).required(),
    })
    return joiSchema.validate(_reqBody)
}