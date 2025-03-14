import { Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
// import { token } from 'morgan';  
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoute({ children }) {
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.user)
    
    //get user
    //eslint-disable-next-line
    const getUser=async()=>{
        try{
            dispatch(showLoading())
            const res=await axios.post("http://localhost:8080/api/v1/user/getUserData",{token:localStorage.getItem('token')},{
                headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(hideLoading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }else{
                return <Navigate to="/login" />    
            }
        } catch(error){
            dispatch(hideLoading())
            localStorage.clear()
            console.log(error)
    }
}

    useEffect(()=>{
        if(!user){
            getUser()
        }
    },[user,getUser])

    if (localStorage.getItem('token')) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}