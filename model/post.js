const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const post=sequelize.define("post",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    link:{
        type:Sequelize.STRING,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=post;