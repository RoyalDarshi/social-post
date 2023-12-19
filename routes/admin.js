const express=require("express");

const adminController=require("../controller/admin");

const router=express.Router();

router.get("/",adminController.sendFile);

router.post("/add-post",adminController.createPost);

router.get("/get-post",adminController.getPosts)

router.post("/add-comment",adminController.createComment);

router.post("/get-comment",adminController.getComments)

module.exports=router;