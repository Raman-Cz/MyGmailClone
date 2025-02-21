import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFolderSymlink } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const Mail = () => {
    const {selectedEmail} = useSelector(store => store.app);
    const navigate = useNavigate();
    const params = useParams();
    const deleteHandler = async() => {
        try{
            const res = await axios.delete(`http://localhost:8080/api/v1/email/${params.id}`,{
                withCredentials:true
            });
            toast.success(res.data.message);
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>
            <div className='flex items-center justify-between px-4'>
                <div className='flex items-center gap-8 text-gray-700 py-2'>
                    <div className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer' onClick={() => navigate("/")}>
                        <MdOutlineArrowBackIosNew size={'20px'} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer'>
                            <IoArchiveOutline size={'18px'} />
                        </div>

                        <div className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer'>
                            <FiAlertCircle size={'18px'} />
                        </div>

                        <div onClick={deleteHandler} className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer'>
                            <MdOutlineDelete size={'18px'} />
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer'>
                            <MdOutlineMarkEmailUnread size={'18px'} />
                        </div>

                        <div className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer'>
                            <BsFolderSymlink size={'18px'} />
                        </div>

                        <div className='hover:bg-gray-200 rounded-full p-2 hover:cursor-pointer'>
                            <IoMdMore size={'18px'} />
                        </div>
                    </div>


                </div>
                <div className='flex items-center gap-2'>
                    <span>1 to 50 of 2500</span>
                    <MdKeyboardArrowLeft size={'20px'} />
                    <MdKeyboardArrowRight size={'20px'} />
                </div>
            </div>
            <div className='h-[90vh] overflow-y-auto p-4'>
                <div className='flex justify-between bg-white items-center gap-1'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-xl font-medium'>{selectedEmail?.subject}</h1>
                        <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
                    </div>
                    <div className='flex-none text-gray-400 my-5 text-sm'>
                        <p>12 days ago</p>
                    </div>
                </div>
                <div className='text-gray-500 text-sm'>
                    <h1>{selectedEmail?.to}</h1>
                    <span>to me</span>
                </div>
                <div className='my-10'>
                    <p>{selectedEmail?.message}</p>
                </div>
            </div>
        </div>
    )
}

export default Mail