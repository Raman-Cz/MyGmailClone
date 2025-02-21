import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [input,setInput] = useState({
    email:"",
    password:""
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://127.0.0.1:8080/api/v1/user/login",input,{
        headers:{
          'Content-Type':"application/json"
        },
        withCredentials:true
      });
      
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.res.data.message);
    }
  }

  return (
    <div className='flex items-center justify-center w-screen pt-20'>
        <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
            <h1 className='font-bold text-2xl  my-2'>Enter Info</h1>
            <input onChange={changeHandler} name='email' value={input.email} type='email' placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1'/>
            <input onChange={changeHandler} name='password' value={input.password} type='password' placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1'/>
            <button type='submit' className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-400'>Log In</button>
            <p>Don't have an account? <Link to={'/signup'} className='text-blue-600 '>Sign Up</Link></p>
        </form>
    </div>
  )
}

export default Login