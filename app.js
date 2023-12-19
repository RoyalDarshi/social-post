const path=require("path");

const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");

const db=require("./util/database");
const adminRouter=require("./routes/admin");
const errorController=require("./controller/error");
const Post=require("./model/post");
const Comment=require("./model/comment");

const app=express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(adminRouter);

app.use(errorController.pageNotFound);

Comment.belongsTo(Post,{constraints:true,onDelete:"CASCADE"});
Post.hasMany(Comment);

db.sync().then(()=>{
    app.listen(3000);
})