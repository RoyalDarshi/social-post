const express=require("express");

const adminController=require("../controller/admin");

const router=express.Router();

router.get("/",adminController.sendFile);

router.post("/add-post",adminController.createPost);

router.get("/get-post",adminController.getPosts)

router.post("/add-comment",adminController.createComment);

router.get("/get-comment/:id",adminController.getComments)

module.exports=router;