"use client"
import ResetPassword from "@/components/ResetPassword"
import RegisterForm from "@/components/RegisterForm"
import { PiTargetDuotone } from "react-icons/pi"
import { useState } from "react";
import { useSession } from "next-auth/react";


const page = () => {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('change pass'); // Initial active tab
  const notAllowedCreate = ["zonal","pnp user"]

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4 text-gray-800 bg">
        <PiTargetDuotone className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      {/* tabs */}
      <div className='flex justify-start gap-1 w-full border-b'>
        <p
          className={` p-3 text-base  font-medium text-center cursor-pointer ${activeTab === 'change pass' ? 'bg-slate-700 text-white rounded-tr-xl' : ''
            }`}
          onClick={() => handleTabClick('change pass')}
        >
          Change Password
        </p>
        { ~notAllowedCreate.includes(session?.user?.role) &&
          <p
            className={` p-3 text-base  font-medium text-center  cursor-pointer ${activeTab === 'register' ? 'bg-slate-700 text-white rounded-t-xl' : ''
              }`}
            onClick={() => handleTabClick('register')}
          >
            Register User
          </p>
        }
      </div>
      {activeTab === "register" && <RegisterForm />}
      {activeTab === "change pass" && <ResetPassword />}
      
      
    </div>
  )
}

export default page