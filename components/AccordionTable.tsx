"use client"
import React, { useState } from 'react';
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


const AccordionTable = ({ icon, title, headers, data }) => {
    const [isExpanded, setExpanded] = useState(title === "Overall Target" ? true : false);

    return (
        <div className={`mt-2 w-full mx-auto`}>
            <div
                className="cursor-pointer flex items-center justify-between bg-gray-50 border-gray-300 font-medium border-b-2 p-3 rounded-md transition-all duration-300  transform "
                onClick={() => setExpanded(!isExpanded)}
            >
                <div className='flex justify-center items-center gap-2'>
                    {icon}
                    <div>
                        {title}
                    </div>
                </div>
                {isExpanded &&
                    <IoMdArrowDropup />
                }

                {!isExpanded &&
                    <IoMdArrowDropdown />
                }

            </div>
            <div
                className={`mt-1 overflow-scroll sm:overflow-hidden  transition-all duration-300 ${isExpanded ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <table className="table-fixed w-[768px] md:w-full shadow-sm border rounded ">
                    <thead>
                        <tr className='bg-slate-800'>
                            {headers.map((header, index) => (
                                <th key={index} className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white" >
                        {data.map((row, rowIndex) => (
                            <tr className=" text-xs transition-colors hover:bg-cyan-100 sm:text-sm" key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex} className="py-3 px-4 border-b max-w-[100px]">
                                        {row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccordionTable;
