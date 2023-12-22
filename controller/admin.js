const path=require("path");

const rootDir=require("../util/path");
const Post=require("../model/post");
const Comment=require("../model/comment");
const {where} = require("sequelize");

module.exports.sendFile=(req,res,next)=>{
    res.sendFile(path.join(rootDir,"view","index.html"))
}

module.exports.createPost=async (req, res, next)=>{
    const link=req.body.link;
    const desc=req.body.description;
    await Post.create({link:link,description:desc}).then(data=>{
        res.status(201).json(data.dataValues);
    })
}

module.exports.getPosts=(req,res,next)=>{
    Post.findAll().then(data=>{
        res.status(201).json(data)
    })
}

module.exports.getComments=(req, res, next)=>{
    const id=req.params.id;
    console.log(req.body)
    Comment.findAll({where:{postId:id}}).then(data=>{
        res.status(201).json(data);
    })
}

module.exports.createComment=(req,res,next)=>{
    const postId=req.body.postId;
    const comment=req.body.comment;
    Comment.create({comment:comment,postId:postId}).then(data=>{
        res.status(201).json(data.dataValues);
    })
}