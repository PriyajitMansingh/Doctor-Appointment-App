const authMiddleware = require('../middlewares/authMiddleware');

const express = require('express')
const { getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController } = require('../controllers/doctorCtrl.js')


const router=express.Router()

//POST SINGLE DOC INFO
router.post("/getDoctorInfo",authMiddleware,getDoctorInfoController)

//POST UPDATE PROFILE
router.post("/updateProfile",authMiddleware,updateProfileController)

//POST SINGLE DOCTOR INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController)

//GET APPOINTMENT LISTS
router.get("/doctor-appointments",authMiddleware,doctorAppointmentsController)

//POST UPDATE STATUS
router.post("/update-status",authMiddleware,updateStatusController)

module.exports=router