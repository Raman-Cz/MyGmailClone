import React, { useState } from 'react'
import { MdOutlineCropSquare } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaInbox } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { ImInfo } from "react-icons/im";
import Emails from './Emails';

const mailType = [
    {
        icon:<FaInbox size={'20px'}/>,
        text:"Primary"
    },
    {
        icon:<FaTag size={'20px'}/>,
        text:"Promotions"
    },
    {
        icon:<IoIosPeople size={'20px'}/>,
        text:"Social"
    },
    {
        icon:<ImInfo size={'20px'}/>,
        text:"Updates"
    },
]

const Inbox = () => {
    const [selected,setSelected] = useState(0);
    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>

            <div className='flex items-center justify-between px-4 m-2'>
                <div className='flex gap-2'>
                    <div className='flex items-center gap-1'>
                        <MdOutlineCropSquare size={'20px'} />
                        <FaCaretDown />
                    </div>

                    <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoRefreshCircleOutline size={'20px'} />
                    </div>

                    <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoMdMore size={'20px'} />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span>1 to 50 of 2500</span>
                    <MdKeyboardArrowLeft size={'20px'}/>
                    <MdKeyboardArrowRight size={'20px'}/>
                </div>
            </div>
            <div className='h-90vh overflow-y-auto'>
                <div className='flex items-center gap-1'>
                    {
                        mailType.map((item,index) => {
                            return (
                                <button onClick={() => setSelected(index)} className={` ${selected === index ?"border-b-4 border-b-blue-500 text-blue-500":"border-b-4 border-b-transparent"} w-52 flex items-center gap-5 p-4 hover:bg-gray-100`}>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </button>
                            )
                        })
                    }
                </div>
                <Emails />
            </div>
        </div>
    )
}

export default Inbox