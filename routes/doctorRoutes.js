const authMiddleware = require('../middlewares/authMiddleware');

const express = require('express')
const { getDoctorInfoController,updateProfileController,getDoctorByIdController } = require('../controllers/doctorCtrl.js')


const router=express.Router()

//POST SINGLE DOC INFO
router.post("/getDoctorInfo",authMiddleware,getDoctorInfoController)

//POST UPDATE PROFILE
router.post("/updateProfile",authMiddleware,updateProfileController)

//POST SINGLE DOCTOR INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController)

module.exports=router