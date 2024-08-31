
const jwt =require('jsonwebtoken')
const User=require('../model/userModel')
require('dotenv').config()
exports.requireSignin=async(req,res,next)=>{
    try{
        const decode = await jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        console.log(decode);
        req.user=decode;
        
        next();

    }
    catch(err){
        console.log("err",err)
        return res.status(400).json({
            success:false,
            message:"Failed in token verification"
        })
    }

}

exports.isadmin =async(req,res,next)=>{
    try{
        // const result= req.user;

         
    const user = await User.findById(req.user.id)
    console.log(req.user)
    console.log(user)
    
    // console.log(result)
    if(user.role !==1){
        return res.status(401).json({
            success:false,
            message:"unothorized access"

        })
    }else{
        next();
    }
    }
    catch(err){
    console.log(err)
    return res.status(404).json({
        success:false,
        message:"failed in checkinng auth"
    })
    }
}