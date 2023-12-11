"use client"
import { useState } from 'react';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { RxDashboard } from "react-icons/rx";
import { TbRuler, TbTargetArrow } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { RiMapPinLine } from "react-icons/ri";
import Link from "next/link"
import { usePathname } from 'next/navigation'


const Sidebar = () => {
    const [isCollapsed, setCollapsed] = useState(true);
    const pathname = usePathname()

    const toggleSidebar = () => {
        setCollapsed(!isCollapsed);
    };

    const NavLinkObj = [
        {
            text: "Dashboard",
            icon: RxDashboard,
            path: "/"
        },
        {
            text: "Target",
            icon: TbTargetArrow,
            path: "/target"
        },
        {
            text: "Map",
            icon: RiMapPinLine,
            path: "/map"
        },
        {
            text: "Upload",
            icon: FiUploadCloud,
            path: "/upload"
        },
    ]



    return (
        <div className={` ${isCollapsed ? 'sticky' : 'fixed sm:sticky'} top-0 left-0 bottom-0 flex h-[100dvh] text-sm ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800  z-40 text-white transition-all duration-200 p-2 md:p-4`}>
            <div className={`flex-1 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'} overflow-hidden `}>
                {/* head button */}
                <div className={`flex items-center  ${isCollapsed ? 'justify-center' : 'justify-between'} mt-4  mb-24 w-full`}>
                    <p className={`${isCollapsed ? 'hidden' : 'inline-block'} transition-opacity duration-300 whitespace-nowrap flex gap-2 items-center`}>
                        <DocumentChartBarIcon className='w-6 h-6' />
                        <span>
                            Operation Ops
                        </span>
                    </p>

                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        {isCollapsed ?
                            <GoSidebarCollapse className='w-6 h-6' />
                            :
                            <GoSidebarExpand className='w-6 h-6' />
                        }
                    </button>
                </div>
                {/* navs */}
                <div className="overflow-hidden flex-1 flex flex-col justify-between w-full ">
                    {/* Your sidebar content goes here */}
                    <ul className='space-y-5'>
                        {
                            NavLinkObj.map((item, index) =>
                                <Link key={index} href={item.path} className={`flex rounded-full items-center  ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 hovernav ${pathname === item.path ? 'active' : ''}`}>
                                    <div className='p-3 bg-gray-900 rounded-full' >
                                        <item.icon className='w-5 h-5 box-content' />
                                    </div>
                                    <span className={`font-medium ${isCollapsed ? 'hidden' : 'inline'}`}>{item.text}</span>
                                </Link>
                            )
                        }

                    </ul>
  
                    <ul className='space-y-5 pt-5 border-t border-gray-500'>
                        <li className={`flex items-center  ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 hovernav`}>
                            <div className='p-2 bg-gray-900 rounded-full' >
                                <CiSettings className='w-5 h-5 box-content' />
                            </div>
                            <span className={` ${isCollapsed ? 'hidden' : 'inline'}`}>Settings</span>
                        </li>
                        <li className={`flex items-center  ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 hovernav`}>
                            <div className='p-2 bg-gray-900 rounded-full' >
                                <AiOutlineLogout className='w-5 h-5 box-content' />
                            </div>
                            <span className={` ${isCollapsed ? 'hidden' : 'inline'}`}>Logout</span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
