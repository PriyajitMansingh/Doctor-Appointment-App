const authMiddleware = require('../middlewares/authMiddleware');

const express = require('express')
const { getDoctorInfoController } = require('../controllers/doctorCtrl.js')


const router=express.Router()

//GET SINGLE DOC INFO
router.get("/getDoctorInfo",authMiddleware,getDoctorInfoController)

module.exports=router