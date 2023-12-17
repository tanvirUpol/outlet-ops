import { TbCloudDownload } from "react-icons/tb";
import * as XLSX from 'xlsx';


interface DataItem {
  _id?: string;
  __v?: number;
  [key: string]: any; // Allow any other properties
}

interface DownloadButtonProps {
  data: DataItem[];
  fileName?: string;
}

const Download: React.FC<DownloadButtonProps> = ({ data, fileName }) => {

  const downloadExcel = () => {
    // Remove _id and __v properties from each object
    const cleanedData = data.map(({ _id, __v, ...rest }) => rest);

    const ws = XLSX.utils.json_to_sheet(cleanedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'data.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadExcel} className="flex gap-3 justify-center items-center  pr-4 pl-4  bg-slate-900 text-white  shadow border border-gray-100  rounded-md w-fit transition-all duration-300 ease-in-out transform hover:scale-105 text-xs md:text-sm" >
      <TbCloudDownload className="w-6 h-6" />
      <span>Download</span>
    </button>
  )
}

export default Download