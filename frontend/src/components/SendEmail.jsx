import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setEmails, setOpen } from '../redux/appSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const SendEmail = () => {
    const {open,emails} = useSelector(store => store.app);
    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        to:"",
        subject:"",
        message:""
    });

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://127.0.0.1:8080/api/v1/email/create", formData, {
                headers: {
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            dispatch(setEmails([...emails, res.data.email]));
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
        dispatch(setOpen(false));
    }

  return (
    <div className={` ${open ? "block":"hidden"} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
        <div className='flex items-center justify-between px-2 py-3 bg-[#F2F6FC]'>
            <h1>New Message</h1>
            <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                <RxCross2 size={'20px'}/>
            </div>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'> 
            <input onChange={changeHandler} value={formData.to} name='to' type='text' placeholder='To' className='py-1 outline-none border-b border-gray-300 '/>
            <input  onChange={changeHandler} value={formData.subject} name='subject' type='text' placeholder='Subject' className='py-1 outline-none border-b border-gray-300 '/>
            <textarea  onChange={changeHandler} value={formData.message} name='message' rows={'10'} cols={'30'} className='outline-none py-1'></textarea>
            <button type='submit' className='bg-blue-700 rounded-full w-fit px-4 py-1 text-white hover:bg-blue-500' >Send</button>
        </form>
    </div>
  )
}

export default SendEmail