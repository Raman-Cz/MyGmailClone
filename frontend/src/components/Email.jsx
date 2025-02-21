import React, { useState } from 'react'
import { MdOutlineCropSquare } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedEmail } from '../redux/appSlice';
import { formatDistanceToNow } from 'date-fns';

const Email = ({email}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openMail = () => {
        dispatch(setSelectedEmail(email));
        navigate(`/mail/${email._id}`);
    }
    const originalDate = new Date(`${email.createdAt}`); // Example MongoDB date
    const formattedDate = formatDistanceToNow(originalDate, { addSuffix: true });

    return (
        <div onClick={openMail} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md' >

            <div className='flex items-center gap-3'>
                <div className='text-gray-300 hover:text-gray-600'>
                    <MdOutlineCropSquare size={'20px'}/>
                </div>
                <div className='text-gray-300 hover:text-gray-600'>
                    <FaRegStar size={'20px'}/>
                </div>
                <div>
                    <h1 className='font-semibold'>{email?.subject}</h1>
                </div>
            </div>
            <div className='flex-1 ml-4'>
                <p>
                    {email?.message}
                </p>
            </div>
            <div className='flex-none text-gray text-sm'>
                <p>{formattedDate}</p>
            </div>
        </div>
    )
}

export default Email