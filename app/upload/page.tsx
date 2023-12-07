import ExcelUploader from '@/components/ExcelUploader';
import React from 'react'
import { RiUploadCloud2Line } from "react-icons/ri";


const upload = () => {
    return (
        <div className="flex-1 p-4 "> {/* Add ml-16 for the margin */}
            {/* Your main content goes here */}
            <div className="flex items-center gap-2 mb-4 text-gray-800">
                <RiUploadCloud2Line className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Upload Data</h1>
            </div>
           <ExcelUploader />
            {/* Add more content as needed */}
        </div>
    )
}

export default upload