const message = require("../models/message");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sequelize = require("../util/database");


exports.addMessage = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const messages = req.body.message;
        console.log(message);
        const data = await message.create({
            message: messages,
            userId: req.user.id,
            userName: req.user.name
        },
        {
            transaction: transaction
        });
        res.json({
            newmessage: data,
            success: true
        });
        await transaction.commit();
    }catch(err){
        transaction.rollback();
        console.log(err);
        return res.json({
            Error: err,
            success: false
        })
    }
}

exports.getMessages = async(req,res,next)=>{
    try{
        const data = await message.findAll({
            where: {
                userId: req.user.id
            }
        })
        return res.json({
            allMessage: data,
            success: true
        })
    }catch(err){
        console.log(err);
        return res.json({
            Error: err,
            success: false
        })
    }
}