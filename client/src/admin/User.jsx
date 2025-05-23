import Layout from "../components/Layout"
import { useState,useEffect } from "react";
import axios from "axios"
import { Table} from "antd";

const User = () => {
  const [users, setUsers]=useState([])

  //get Users
  const getUsers=async()=>{
    try{
      const res=await axios.get("http://localhost:8080/api/v1/admin/getAllUsers",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data)
      }
    }catch(error){
      console.log(error)

    }
  }

  useEffect(()=>{
    getUsers()
  },[])

  //antD table col
  const columns=[
    {
    title:"Name",
    dataIndex:"name",
  },
  {
    title:"Email",
    dataIndex:"email"
  },
  {
    title:"Doctor",
    dataIndex:"isDoctor",
    render:(text,record)=>(
      <span>{record.isDoctor ? "Yes" : "No"}</span>
    )
  },
  {
    title:"Actions",
    dataIndex:"actions",
    render:(text,record)=>(
      <div className="d-flex">
      <button className="btn btn-danger">Block</button>
      </div>
    )
  }
 
]
  return (
    <div>
      <Layout>
        <h1 className="text-center m-2">Users List</h1>
        <Table columns={columns} dataSource={users}/>
      </Layout>
    </div>
  )
}

export default User
