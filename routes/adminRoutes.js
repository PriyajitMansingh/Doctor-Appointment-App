const express = require('express');
const userModel = require("../models/userModels.js");
const doctorModel = require("../models/doctorModel.js")
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../controllers/adminCtrl.js');


//GET METHOD || USERS
router.get("/getAllUsers",authMiddleware,getAllUsersController)

//GET METHOD || DOCTORS
router.get("/getAllDoctors",authMiddleware,getAllDoctorsController)

//POST ACCOUNT STATUS
router.post("/changeAccountStatus",authMiddleware,changeAccountStatusController)
module.exports =router