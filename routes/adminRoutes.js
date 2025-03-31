const express = require('express');
const userModel = require("../models/userModels.js");
const doctorModel = require("../models/doctorModel.js")
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const { getAllUsersController, getAllDoctorsController } = require('../controllers/adminCtrl.js');


//GET METHOD || USERS
router.get("/getAllUsers",authMiddleware,getAllUsersController)

//GET METHOD || DOCTORS
router.get("/getAllDoctors",authMiddleware,getAllDoctorsController)
module.exports =router