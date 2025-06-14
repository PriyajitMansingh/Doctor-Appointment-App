import Layout from "../components/Layout"
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { DatePicker,TimePicker,message } from 'antd';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {showLoading,hideLoading} from "../redux/features/alertSlice"


const BookingPage = () => {
  const {user}=useSelector(state=>state.user)
  const [doctors, setDoctors] = useState([])
  const params=useParams()
  const [time, setTime] = useState()
  const [date, setdate] = useState([])
  const [isAvailable, setIsAvailable] = useState()
  const dispatch=useDispatch()

  
    //login user data
  const getUserData=async()=>{
    try{
      const res=await axios.post("http://localhost:8080/api/v1/doctor/getDoctorById",
        {doctorId:params.doctorId},
        {
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token")
        }
      })
      if(res.data.success){
        setDoctors(res.data.data)
      }
    }catch(error){
      console.log(error)
    }
  }

  //============booking function
  const handleBooking=async()=>{
    try{
      dispatch(showLoading())
      const res=await axios.post("http://localhost:8080/api/user/book-appointment",
      {doctorId:params.doctorId,
        userId:user._id,
        doctorInfo:doctors,
        date:date,
        userInfo:user,
        time:time
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }
    }catch(error){
      dispatch(hideLoading())
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getUserData()
    //eslint-disable-next-line
  }
  ,[])
  return (
    <Layout>
        <h3 className="m-2">Booking Page</h3>
        <div className="container">
          {doctors && (
           <div>
             <h4> Dr.{doctors.firstName} {doctors.lastName}</h4>
             <h4>Fees: {doctors.feesPerConsultation}</h4>
             {doctors?.timings?.length >= 2 && (
  <h4>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4>
)}

             <div className="d-flex flex-column w-50">
                <DatePicker className="m-2" format="DD-MM-YY" onChange={(value)=>moment(value).format("DD-MM-YY")}/>
                <TimePicker className="m-2" format="HH:mm" onChange={(value)=>
                  setTime(moment(value).format("HH:mm"))
                }/>
                <button className="btn btn-primary mt-2">Check Availability</button>
                <button className="btn btn-dark mt-2" onClick={handleBooking}>Book Now</button>
             </div>
           </div>
          )}
        </div>
    </Layout>
  )
}

export default BookingPage
