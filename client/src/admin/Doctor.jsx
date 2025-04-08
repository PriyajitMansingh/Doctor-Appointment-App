import Layout from "../components/Layout"
import { useState,useEffect } from "react"
import axios from "axios"
import { Table } from "antd"

const Doctor = () => {
  const [doctors,setDoctors]=useState([])
  //getDoctors
  const getDoctors=async()=>{
    try{
      const res=await axios.get("http://localhost:8080/api/v1/admin/getAllDoctors",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log("Doctors Data:", res.data.data);
      if(res.data.success){
        setDoctors(res.data.data)
      }
    }catch(error){
      console.log(error)

    }
  }
  useEffect(()=>{
    getDoctors()
  },[])

  const columns=[
   {
     title:"Name",
    dataIndex:"name",
    render:(text,record)=>(
      <span>{record.firstName} {record.lastName}</span>
    )
  },
  {
    title:"Status",
    dataIndex:"status",
  },
  {
    title:"Phone",
    dataIndex:"phone"
  },
  {
    title:"Actions",
    dataIndex:"actions",
    render:(text,record)=>(
      <div className="d-flex">{record.status==="pending"?(<button className="btn btn-success">Approve</button>):(<button className="btn btn-danger">Reject</button>)}</div>
    ),
  },
  ]
  return (
    <div>
      <Layout>
        <h1>All Doctors</h1>
        <Table columns={columns} dataSource={doctors} />
      </Layout>
    </div>
  )
}

export default Doctor
