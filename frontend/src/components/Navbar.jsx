import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {setAuthUser, setSearchText} from '../redux/appSlice.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user } = useSelector(store => store.app);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = async () => {
        try{
            const res = await axios.get("http://localhost:8080/api/v1/user/logout");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            navigate("/login");
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        dispatch(setSearchText(text));
    }, [text]);


    return (
        <div className='flex items-center justify-between mx-3 h-16'>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    <div className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                        <GiHamburgerMenu />
                    </div>
                    <img className='w-8' src='https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png' alt='gmail-logo' />
                    <h1 className='text-2xl text-gray-500 font-medium' >Gmail</h1>
                </div>

            </div>
            {
                user && (
                    <>
                        <div className='w-[50%] mr-60' >
                            <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
                                <CiSearch size={'24px'} />
                                <input
                                    type='text'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder='Search mail'
                                    className='rounded-full w-full bg-transparent outline-none px-1'
                                />
                            </div>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <FaRegCircleQuestion size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <IoSettings size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <BsFillGrid3X3GapFill size={'24px'} />
                            </div>
                            <span onClick={logOutHandler} className='underline cursor-pointer'>Log Out</span>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <img
                                    src={user.profilePhoto}
                                    alt="Profile Picture"
                                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Navbar