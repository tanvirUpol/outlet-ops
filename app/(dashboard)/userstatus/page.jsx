"use client"
import React, { useState, useEffect } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaUserClock } from "react-icons/fa";

const page = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    function formatDateTime(date) {
        // console.log(date);
        if (date == "Invalid Date") {
            return "No Acticity"
        }
        // console.log(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = date.getMonth();
        const monthName = months[monthIndex];
        const day = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        const formattedDateTime = `${day} ${monthName} ${year} , ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

        return formattedDateTime;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/user/');
                const jsonData = await response.json();
                console.log(jsonData);
                setData(jsonData);
                setFilteredData(jsonData); // Initially set filtered data to all data
                const uniqueRoles = [...new Set(jsonData.map(user => user.role))]; // Extract unique roles
                setRoles(uniqueRoles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setSelectedRole(selectedRole);
        if (selectedRole === 'all') {
            setFilteredData(data); // If 'all' is selected, show all data
        } else {
            const filtered = data.filter(user => user.role === selectedRole);
            setFilteredData(filtered);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = data.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredData(filtered);
    };

    // if (filteredData.length <= 0) {
    //     return <div className="text-gray-600 flex justify-center items-center w-full text-center h-[72dvh]">
    //         <CgSpinnerTwo className="w-40 h-40 animate-spin" />
    //     </div>
    // }




    return (
        <div className="w-full p-4 mx-auto">
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-2 mb-4 text-gray-800">
                    <FaUserClock className="w-6 h-6" />
                    <h1 className="text-2xl font-bold">User Activity</h1>
                </div>
                <div className="mb-4">
                    <label htmlFor="roleFilter" className="mr-2">Filter by Role:</label>
                    <select
                        id="roleFilter"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="all">All</option>
                        {roles.map((role, index) => (
                            <option className='uppercase' key={index} value={role}>{role}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search by Email"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
            </div>

            <table className=" table-auto w-[768px] md:w-full shadow-sm rounded border">
                <thead className="sticky top-0">
                    <tr className="bg-slate-800">
                        <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Email</th>
                        <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Name</th>
                        <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Role</th>
                        <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Last Active</th>
                        <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Count</th>
                    </tr>
                </thead>
                <tbody className="divide-y text-sm divide-gray-200 bg-white">
                    {filteredData.length <= 0 &&
                        <tr   className="hover:bg-gray-100 cursor-pointer">
                            <td colSpan={4} className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="text-gray-600 flex justify-center items-center w-full text-center h-[72dvh]">
                                    <CgSpinnerTwo className="w-40 h-40 animate-spin" />
                                </div>
                            </td>
                        </tr>}
                    
                    {filteredData.length > 0 && filteredData.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{user.email}</td>
                                <td className="py-3 px-6 text-left">{user.name}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{(user.role)}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{formatDateTime(new Date(user.lastActive))}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{(user.activityCount)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default page