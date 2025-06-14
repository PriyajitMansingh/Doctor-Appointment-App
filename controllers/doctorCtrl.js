const doctorModel = require("../models/doctorModel")

const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:"doctor data fetch success",
            data:doctor,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Fetching Doctor Details"})
    }
}

// POST UPDATE PROFILE
const updateProfileController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(200).send({success:true,
            message:"Doctor Profile Updated Successfully",
            data:doctor,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Doctor Profile Update issue",
            error
        })
    }
}

//POST SIGLE DOC INFO
const getDoctorByIdController=async (req,res)=>{
    try{
        const doctor=await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:"Single Doc Info Fetched",
            data:doctor
        })
    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Single Doctor Info"
        })
    }
}

module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController}