import React from 'react'
import { FaPencil } from "react-icons/fa6";
import { FaInbox } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoSendOutline } from "react-icons/io5";
import { RiDraftLine } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItems = [
    {
        items: <FaInbox size={"20px"} />,
        text: "Inbox"
    },
    {
        items: <FaRegStar size={"20px"} />,
        text: "Starred"
    },
    {
        items: <FaRegClock size={"20px"} />,
        text: "Snoozed"
    },
    {
        items: <IoSendOutline size={"20px"} />,
        text: "Sent"
    },
    {
        items: <RiDraftLine size={"20px"} />,
        text: "Drafts"
    },
    {
        items: <IoIosArrowDropdown size={"20px"} />,
        text: "More"
    },
]


const Sidebar = () => {
    const dispatch = useDispatch();

  return (
    <div className='w-[15%]'>
        <div className='p-3'>
            <button onClick={() => dispatch(setOpen(true))} className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-full hover:shadow-md'>
                <FaPencil size={'24px'}/>
                Compose
            </button>
        </div>

        <div className='text-gray-500'>
            {
                sidebarItems.map((item,index) => {
                    return (
                        <div className='flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200'>
                           {item.items}
                           <p>{item.text}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Sidebar