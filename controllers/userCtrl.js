const userModel=require("../models/userModels")
const bcrypt=require("bcryptjs")

//register callback
const registerController=async(req,res)=>{
    try{
       const existingUser=await userModel.findOne({email:req.body.email})
         if(existingUser){
              return res.status(400).send({message:"User already exist",success:false})
         }
         const password=req.body.password
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            req.body.password=hashedPassword
            const newUser=await userModel.create(req.body)
            await newUser.save()
            res.status(201).send({message:"Register successfully",success:true})
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,message:`Register controller error: ${error}`})
    }
}
const loginController=()=>{}

module.exports = {loginController,registerController}