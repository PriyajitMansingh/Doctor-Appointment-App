const userModel=require("../models/userModels")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const doctorModel=require("../models/doctorModel")
const mongoose = require("mongoose");
const appointmentModel=require("../models/appointmentModel")
const moment=require('moment')

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

//login callback
const loginController=async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:"user not found",success:false})   
        }
        const isMatch=await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:"Invalid Email or Password",success:false})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).send({message:"Login successfully",success:true,token:token})   
    } catch(error) {
        console.log(error)
        res.status(500).send({message:`Error in login CTRL ${error.message}`})
    }
}

const authController=async(req,res)=>{
try{
    const user=await userModel.findById({_id:req.body.userId})
    user.password=undefined
    if(!user){
        return res.status(200).send({message:"user not found",success:false})
    }else{
        res.status(200).send({success:true,
            data:user})
    }
}catch(error){
    console.log(error)
    res.status(500).send({
        message:"auth error",success:false,error
    })
}
}

//Apply Doctor CTRL
const applyDoctorController=async(req,res)=>{
    try{
        const newDoctor=await doctorModel({...req.body,status:"pending"})
        await newDoctor.save()
        const adminUser=await userModel.findOne({isAdmin:true})
        const notification=adminUser.notification
        notification?.push({
            type:"apply-doctor-request",
            message:`${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName + " " + newDoctor.lastName,
                onclickPath:"/admin/doctors"
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message:"Doctor Account Applied Successully"
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error While Applying For Doctor"
        })
    }
}

//notification ctrl
const getAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findById({_id:req.body.userId})
        const seennotification=user.seennotification
        const notification=user.notification
        seennotification?.push(...notification)
        user.notification=[]
        user.seennotification=notification
        const updatedUser=await user.save()
        res.status(200).send({
            success:true,
            message:"all notification marked as read",
            data:updatedUser,
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            message:"Error in notification",
            success:false,
            error
        })
    }
}

//delete all notification ctrl
const deleteAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        user.notification=[]
        user.seennotification=[]
        const updatedUser=await user.save()
        updatedUser.password=undefined
        res.status(200).send({
            success:true,
            message:"Notifications Deleted Successfully",
            data:updatedUser,
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Unable to delete all notifications",
            error
        })
    }
}

//get all doc
const getAllDoctorsController=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({status:"approved"})
        res.status(200).send({
            success:true,
            message:"Doctors List Fetched Successfully",
            data:doctors
        })
    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error While Fethcing Doctor",
            error
        })
    }
}

//BOOK APPOINTMENT
const bookeAppointmentController=async (req,res)=>{
    try{
         console.log("Incoming body to book appointment:", req.body);
        req.body.date=moment(req.body.date,"DD-MM-YYYY").toISOString()
        req.body.time=moment(req.body.time,"HH:mm").toISOString()
        req.body.status="pending"
        const newAppointment=new appointmentModel(req.body)
        await newAppointment.save()
        const user=await userModel.findOne({_id:req.body.doctorInfo.userId})
        user.notification.push({
            type:"new-appointment-request",
            message:`New Appointment Request From ${req.body.userInfo.name}`,
            onclickPath:"/user/appointments"
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:"Appointment Booked Successfully",
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error While Booking Appointment",
            error
        })
    }
}

//booking bookingAvailabilityController
const bookingAvailabilityController=async (req,res)=>{
    try{
        const date=moment(req.body.date,"DD-MM-YYYY").toISOString()
        const fromTime=moment(req.body.time,"HH:mm").subtract()(1,"hours").toISOString()
        const toTime=moment(req.body.time,"HH:mm").add()(1,"hours").toISOString()
        const doctorId=req.body.doctorId
        const appointments=await appointmentModel.find({doctorId,
            date,
            time:{
                $gte:fromTime,$lte:toTime
            }})
            if(appointments.length>0){
                return res.status(200).send({
                    message:"Appointment Not Available is this time",
                    success:false
                })
            }else{
                return res.status(200).send({
                    success:true,
                    message:"Appointment available",
                })
            }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in booking availability",
            error
        })
    }
}

//user appointmentcontroller
const userappointmentsController=async (req,res)=>{
    try{
        const appointments=await appointmentModel.find({userId:req.body.userId})
        res.status(200).send({
            success:true,
            messaage:"User Appointments Fetch Successfully",
            data:appointments
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            messaage:`Error In User Appointments`
        })
    }
}

module.exports = {loginController,registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookeAppointmentController,bookingAvailabilityController,userappointmentsController}