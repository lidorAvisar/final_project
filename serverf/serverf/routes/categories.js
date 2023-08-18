const express = require("express");
const { CategoryModel, validateCategories } = require("../models/categoryModel");
const { authAdmin } = require("../middleWares/auth");
const router = express.Router();

router.get("/",async(req,res) => {
 try {
  const data = await CategoryModel.find({});
  res.json(data);
 }

  catch (error) {
  console.log(error);
  res.status(502).json({error})
 }
})


router.get("/single/:id", async(req,res) => {
    try{
      const data = await CategoryModel.findOne({_id:req.params.id});
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })


  router.post("/" , authAdmin, async(req,res) => {
    const validBody = validateCategories(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
      const cateogry = new CategoryModel(req.body);
      await cateogry.save();
      res.status(201).json(cateogry);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })


  router.put("/:id", authAdmin,async(req,res) => {
    const validBody = validateCategories(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
      const id = req.params.id;
      const data = await CategoryModel.updateOne({_id:id},req.body);
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })


  router.delete("/:id", authAdmin,async(req,res) => {
    try{
      const id = req.params.id;
      const data = await CategoryModel.deleteOne({_id:id});
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })


module.exports = router;