const express=require("express")
const { loginController,registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController, getAllDoctorsController,bookeAppointmentController,bookingAvailabilityController,userappointmentsController } = require("../controllers/userCtrl")
const authMiddleware = require("../middlewares/authMiddleware")

//router object
const router=express.Router()

//routes
//LOGIN || POST
router.post("/login",loginController)

//REGISTER || POST
router.post("/register",registerController)

//Auth || POST 
router.post("/getUserData",authMiddleware,authController)

//Apply Doctor || POST 
router.post("/apply-doctor",authMiddleware,applyDoctorController)

//Notification Doctor || POST 
router.post("/get-all-notification",authMiddleware,getAllNotificationController)

//Notification Doctor || POST 
router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController)

//Get all doc || GET
router.get("/getAllDoctors",authMiddleware,getAllDoctorsController)

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware,bookeAppointmentController)

//Booking Availability 
router.post("/booking-availability",authMiddleware,bookingAvailabilityController)

//Appointments List
router.get("/user-appointments",authMiddleware,userappointmentsController)

module.exports=router
