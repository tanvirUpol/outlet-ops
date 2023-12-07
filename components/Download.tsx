import { LuDownloadCloud } from "react-icons/lu"

const Download = () => {
  return (
    <button className="flex gap-3 justify-center items-center  pr-4 pl-4 py-1 bg-slate-900 text-white text-sm  shadow border border-gray-100 my-4 rounded-md w-fit transition-all duration-300 ease-in-out transform hover:scale-105" >
        <LuDownloadCloud className="w-6 h-6" />
        <span>Download</span>
    </button>
  )
}

export default Download