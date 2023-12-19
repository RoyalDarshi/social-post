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
    /*await Post.findAll({where:{name:name}}).then(async comp => {
        let cid = 0;
        //console.log(comp[0])
        if (!comp[0]) {
            console.log("condition verified")
            await Post.create({name: name}).then(data => {
                console.log(data)
                cid = data.dataValues.id;
            }).catch(err => {
                console.log(err);
            })
        }
        if (cid === 0) {
            console.log(comp)
            cid = comp[0].dataValues.id;
        }
        await Comment.create({pros: pros, cons: cons, rating: rate, companyId: cid})
        res.status(201).json({comp})
    })*/
}

module.exports.getPosts=(req,res,next)=>{
    Post.findAll().then(data=>{
        res.status(201).json(data)
    })
}

module.exports.getComments=(req, res, next)=>{
    const name=req.body.description;
    console.log(req.body)
    Post.findAll({where:{description:name}}).then(data=>{
        if(!data[0]){
            return res.status(201).json(undefined);
        }
        Comment.findAll({where:{postId:data[0].dataValues.id}}).then(data=>{
            res.status(201).json(data);
        })
    })
}

module.exports.createComment=(req,res,next)=>{
    const name=req.body.description;
    const comment=req.body.comment;
    Post.findAll({where:{description:name}}).then((data)=>{
        Comment.create({comment:comment,postId:data[0].dataValues.id}).then(data=>{
            res.status(201).json(data.dataValues);
        })
    })
}