import { Layout } from "antd"
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom"
import axios from "axios"
import { useEffect,useState } from "react";


const Profile = () => {
  const {user}=useSelector(state=>state.user)
  const {doctor,setDoctor}=useState(null)

  //getDoc Details
  const getDoctorInfo=async()=>{
    try{
      const res=await axios.post("http://localhost:8080/api/v1/doctor/getDoctorInfo",{userId:useParams.id},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    if(res.data.success){
      setDoctor(res.data.data)
    }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getDoctorInfo()
    //eslint-disable-next-line
  },[])
  return (
    <Layout>
        <h1>Manage Profile</h1>
    </Layout>
  )
}

export default Profile
