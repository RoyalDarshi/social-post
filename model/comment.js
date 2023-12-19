const Sequelize=require("sequelize");

const sequelize = require("../util/database");

const comment=sequelize.define("comment",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    comment:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports=comment;