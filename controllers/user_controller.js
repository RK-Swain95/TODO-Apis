const User=require("../models/user");
const jwt = require('jsonwebtoken');

module.exports.signup=async function(req,res){
    try{
     let user= await User.findOne({Email:req.body.Email});
     if(!user){
        let newuser= await User.create(req.body);
        return res.status(200).json({
            messsage:"doctor registration successful",
            User:newuser
        });
        //if user already present
    }else{
        return res.status(200).json({
            messsage : "username already exist",
            User:user
        });
    }
     }
    catch(err){
        console.log(err);

        return res.json(500, {
            message: "error in creating user !!",
          });

    }
}


module.exports.signin=async function(req,res){
    try{
        let user= await User.findOne({Email:req.body.Email});
        if(!user  || user.password!=req.body.password){
            return res.status(422).json({
                messsage:"Invalid username and password !!"
            });
        }else{
            return res.json(200,{
                message:"log in successfully keeep the token safe !!",
                //generating the token
                data:{
                    token:jwt.sign(user.toJSON(),'equevo',{expiresIn:'3000000'})
                }
            });
        }

    }catch(err){
        return res.json(500, {
            message: "error in singing in user !!",
          })
    }
}