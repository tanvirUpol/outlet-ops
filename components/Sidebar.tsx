"use client"
import { useEffect, useState } from 'react';


// icons
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { RxDashboard } from "react-icons/rx";
import { TbTargetArrow } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import { GrTrophy } from "react-icons/gr";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { RiMapPinLine } from "react-icons/ri";
import Image from 'next/image';

// next
import Link from "next/link"
import { usePathname } from 'next/navigation'

// react auth
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import { IoPersonSharp } from 'react-icons/io5';
import { IoIosRibbon } from 'react-icons/io';

const Sidebar = () => {
    const [isCollapsed, setCollapsed] = useState(true);
    const pathname = usePathname()
    const {data: session } = useSession()

    useEffect(() => {
        localStorage.removeItem('user');
    }, [])
    
    // console.log(session?.user?.role);

    const toggleSidebar = () => {
        setCollapsed(!isCollapsed);
    };

    const NavLinkObj = [
        {
            text: "Dashboard",
            icon: RxDashboard,
            path: "/dashboard",
            access: ["zonal","admin"]
        },
        {
            text: "Target",
            icon: TbTargetArrow,
            path: "/target",
            access: ["zonal","admin"]
        },
        // {
        //     text: "Map",
        //     icon: RiMapPinLine,
        //     path: "/map",
        //     access: ["zonal","admin"]
        // },
        {
            text: "Upload",
            icon: FiUploadCloud,
            path: "/upload",
            access: ["admin"]
        },
        {
            text: "Achievement",
            icon: GrTrophy,
            path: "/achievement",
            access: ["admin", "pnp admin", "pnp user"]
        },
    ]



    return (
        <div className={` ${isCollapsed ? 'sticky' : 'fixed sm:sticky'} top-0 left-0 bottom-0 flex h-[100dvh] text-sm ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800  z-40 text-white transition-all duration-200 p-2 md:p-4`}>
            <div className={`flex-1 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'} overflow-hidden `}>
                {/* head button */}
                <div className={`flex items-center  ${isCollapsed ? 'justify-center' : 'justify-between'} mt-4  mb-24 w-full`}>
                    <p className={`${isCollapsed ? 'hidden' : 'inline-block'} transition-opacity duration-300 whitespace-nowrap flex gap-3 items-center`}>
                        {/* <DocumentChartBarIcon className='w-6 h-6' /> */}
                        <Image
                        src="/logo.svg"
                        width={24}
                        height={24}
                        alt="Picture of the author"
                        className='text-white fill-white'
                        />
                        <span>
                            Outlet Pulse
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
                              ( item.access.includes((session?.user?.role)? (session.user.role) : "zonal") &&  
                                <Link key={index} href={item.path} className={`flex rounded-full items-center  ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 hovernav ${pathname === item.path ? 'active' : ''}`}>
                                    <div className='p-3 bg-gray-900 rounded-full' >
                                        <item.icon className='w-5 h-5 box-content' />
                                    </div>
                                    <span className={`font-medium ${isCollapsed ? 'hidden' : 'inline'}`}>{item.text}</span>
                                </Link>)
                            )
                        }

                    </ul>
                    <div>
                        {!isCollapsed && 
                            <div className={`bg-[#334155] p-5  mb-3 rounded-md space-y-4 text-slate-200 text-nowrap`}>
                            {/* <p className='flex items-center gap-2'>
                                <span><IoPersonSharp /></span>
                                <span>{session?.user?.role}</span>
                                </p> */}
                            <p className='flex items-center gap-2'>
                                <span><IoIosRibbon /></span> 
                                <span className='uppercase text-sm'>{session?.user?.role}</span>
                                </p>
                            {/* <p>Role: {user.role}</p> */}
                            </div>}

                        <ul className='space-y-5 pt-5 border-t border-gray-500'>
                            <Link href={"/settings"} className={`flex items-center  ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 hovernav ${pathname === "/settings" ? 'active' : ''}`}>
                                <div className='p-2 bg-gray-900 rounded-full' >
                                    <CiSettings className='w-5 h-5 box-content' />
                                </div>
                                <span className={` ${isCollapsed ? 'hidden' : 'inline'}`}>Settings</span>
                            </Link>
                            <li onClick={() => signOut()} className={`flex items-center cursor-pointer  ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 hovernav`}>
                                <div className='p-2 bg-gray-900 rounded-full' >
                                    <AiOutlineLogout className='w-5 h-5 box-content' />
                                </div>
                                <span className={` ${isCollapsed ? 'hidden' : 'inline'}`}>Logout</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
