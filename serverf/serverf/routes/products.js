const express = require("express");
const { ProductModel, validateProduct } = require("../models/productModel");
const { authAdmin, auth } = require("../middleWares/auth");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const perPage = req.query.perPage || 15;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? -1 : 1;
    const category = req.query.category;
    const search = req.query.s;

    let filterFind = {}

    if (category) {
      filterFind = { category_url: category }
    }
    if (search) {
      const searchExp = new RegExp(search, "i");
      filterFind = { name: searchExp }
    }
   
    const data = await ProductModel
      .find(filterFind)
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (error) {
    console.log(error);
    res.status(502).json({ error })
  }
})



router.get("/count", async (req, res) => {
  try {
    const perPage = req.query.perPage || 15;
    const category = req.query.category;
    const search = req.query.s;
    const user_id = req.query.user_id;
    let filterFind = {}
    if (category) {
      filterFind = { category_url: category }
    }
    if (search) {
      const searchExp = new RegExp(search, "i");
      filterFind = { $or: [{ name: searchExp }, { info: searchExp }] }
    }
    if (user_id) {
      filterFind = { user_id }
    }
    const count = await ProductModel.countDocuments(filterFind);
    res.json({ count, pages: Math.ceil(count / perPage) })
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


router.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductModel.findOne({ _id: id });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})



router.post("/", authAdmin, async (req, res) => {
  const validBody = validateProduct(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.json(product);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})



router.put("/:id", authAdmin, async (req, res) => {
  const validBody = validateProduct(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }
  try {
    const id = req.params.id;
    const data = await ProductModel.updateOne({ _id: id }, req.body)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})



router.post("/groupIds",auth, async (req, res) => {
  try {
    if (!Array.isArray(req.body.favs_ar)) {
      return res.status(400).json({ msg: "You need to send favs_ar as array" });
    }
    const ids = req.body.favs_ar.map(item => item.id);
    const data = await ProductModel.find({ _id: { $in: ids }}).limit(3000)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductModel.deleteOne({ _id: id })
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})



module.exports = router;