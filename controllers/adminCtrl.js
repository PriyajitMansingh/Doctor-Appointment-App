const doctorModel=require("../models/doctorModel.js")
const userModel = require("../models/userModels.js");

const getAllUsersController=async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:"Users data list",
            data:users,
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while fetching users",
            error
        })
    }
}
const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).populate("userId", "phone")
        res.status(200).send({
            success:true,
            messsage:"Doctors Data list",
            data:doctors,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting doctors data",
            error
        })
    }
}

module.exports={getAllDoctorsController,getAllUsersController}