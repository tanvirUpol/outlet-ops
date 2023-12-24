import Image from "next/image"
import * as XLSX from 'xlsx';


const ExampleTableDownload = ({data, fileName}) => {

    const downloadExcel = (headers) => {
        // Create an array of objects with empty values (assuming you want a single row of headers)
        const data = [headers.reduce((obj, header) => ({ ...obj, [header]: '' }), {})];
        
        const ws = XLSX.utils.json_to_sheet(data);
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
    <div className='w-full flex justify-between items-center p-6 gap-5 text-sm md:text-base bg-slate-500/10 rounded-md flex-wrap'>
    <div className='space-y-4'>
        <div className='flex items-center gap-2 font-semibold '>
            {/* <RiFileExcel2Fill className="w-6 h-6 text-emerald-500" /> */}
            <Image
                src="/excel.svg"
                width={24}
                height={24}
                alt="Excel Image"
            />
            <p>Table Example</p>
        </div>
        <p className='text-gray-400 font-light'>Download and use proper header for the selected file</p>
    </div>
    <button onClick={() => downloadExcel(data)} className='bg-white py-3 px-4 rounded font font-semibold shadow hover:bg-green-500 hover:text-white'>Download</button>
</div>
  )
}

export default ExampleTableDownload