"use client"

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RiUploadCloud2Line } from 'react-icons/ri';
import { MdOutlineDateRange } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { numFor } from '@/utility';
import SearchBar from '@/components/SearchBar';

// async function getData() {

//   const res = await fetch(process.env.NEXTAUTH_URL + `/api/achivement/2024-2`, {
//       next: {
//           revalidate: 60
//       }
//   })

//   if (!res.ok) {
//       notFound()
//   }

//   return res.json()
// }
const formatMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Note: getMonth() returns 0-based index
  return `${year}-${month}`;
};


function calculateAchievementPercentage(target, achieved) {
  if (target <= 0) {
    throw new Error("Target value must be greater than zero");
  }

  if (achieved < 0) {
    throw new Error("Achieved value cannot be negative");
  }

  const percentage = (achieved / target) * 100;
  return Math.min(100, percentage); // Ensure the percentage does not exceed 100%
}



const page = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentDate = new Date();
    const formattedMonth = currentDate.toISOString().slice(0, 7); // Extracts the year-month part
    return formattedMonth;
  });
  const [data, setData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedRows, setCollapsedRows] = useState([]);
  const [type, setType] = useState("all")
  const [searchResults, setSearchResults] = useState([]);

  const findTotalSales = (outletCode, category, date) => {
    console.log(outletCode, category, date);
    const result = invoiceData.find(item =>
      item.outlet_code === outletCode &&
      item.cat_3.toLowerCase() === category.toLowerCase() &&
      item.date === date
    );

    return result ? result.total_sales : 0;
  };

  const sumTotalSales = (outletCode, category) => {
    const filteredItems = invoiceData.filter(item =>
      item.outlet_code === outletCode &&
      item.cat_3.toLowerCase() === category.toLowerCase()
    );

    // console.log(filteredItems);

    const totalSalesSum = filteredItems.reduce((sum, item) => sum + parseFloat(item.total_sales), 0);

    return totalSalesSum;
  };

  function getTodaysTarget(data) {
    const today = new Date();
    const formattedToday = formatDate(today);
    return getTargetByDate(data, formattedToday).toFixed(2);
}

function getTomorrowsTarget(data) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = formatDate(tomorrow);
    return getTargetByDate(data, formattedTomorrow).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


function getTargetByDate(data, targetDate) {
  const achievementTargets = data.achievement_target;
  
  for (const target of achievementTargets) {
      if (target.date === targetDate) {
          return target.target;
      }
  }

  // If the date is not found, you may want to handle it accordingly (return a default value or throw an error)
  return null;
}

  // const sumTotalSalesTillYesterday = (outletCode, category) => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  
  //   const filteredItems = invoiceData.filter(item =>
  //     item.outlet_code === outletCode &&
  //     item.cat_3.toLowerCase() === category.toLowerCase() &&
  //     new Date(item.date) < today
  //   );
  
  //   const totalSalesSum = filteredItems.reduce((sum, item) => sum + item.total_sales, 0);
  
  //   return totalSalesSum;
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Format the selected month to match your backend expectations
        // const formattedMonth = formatMonth(selectedMonth);
        // console.log(formattedMonth); 

        const [year, month] = selectedMonth.split('-');
        const formattedMonth = parseInt(month, 10).toString(); // Removes leading zero
        const formattedDate = `${year}-${formattedMonth}`;

        const response = await fetch(`/api/achivement/${formattedDate}`);

        if (!response.ok) {
          setLoading(false)
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        console.log(result);
        setData(result?.achData);
        setInvoiceData(result?.InvData);
      } catch (error) {
        console.log(error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  // console.log(data);

  const toggleRow = (index) => {
    setCollapsedRows((prevCollapsedRows) => {
      const newCollapsedRows = [...prevCollapsedRows];
      newCollapsedRows[index] = !newCollapsedRows[index];
      return newCollapsedRows;
    });
  };


  const handleSearch = (query) => {
    const results = data.filter((outlet) =>
      outlet.outlet_code.toLowerCase().includes(query.toLowerCase()) || outlet.outlet_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const sortedOutlets = (searchResults.length > 0 ? searchResults : data)

  console.log(selectedMonth);

  return (
    <div className="w-full p-4 ">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <RiUploadCloud2Line className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Store PNP Achievements</h1>
      </div>
      <div className="w-full">
        <div className='flex w-full items-center justify-between mb-4 '>
          <div className="flex items-center justify-end">
            <div className='flex items-center gap-2'>
              <h1 className="text-base  font-bold"> Month</h1>
              <input
                type='month'
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
              // showIcon
              // dateFormat="yyyy-MM"
              // icon={<MdOutlineDateRange className="w-6 h-6"/>}
              // showMonthYearPicker
              // className="border border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-start gap-2 items-center mb-2">
            <SearchBar handleSearch={handleSearch} placeHolder="Search by name or code" />
            <Select value={type} onValueChange={(e) => setType(e)} >
              <SelectTrigger className="w-[150px] font-semibold shadow-sm" >
                <SelectValue placeholder="Select a File" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup  >
                  <SelectLabel>Formats</SelectLabel>
                  <SelectItem value="all">All Type</SelectItem>
                  <SelectItem value="beef">Beef</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="chicken">Chicken</SelectItem>
                  <SelectItem value="egg">Egg</SelectItem>
                  <SelectItem value="fish">Fish</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="mutton">Mutton</SelectItem>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </div>
        {/* Month Picker */}

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {sortedOutlets.length > 0 && (
          <table className=" table-fixed w-[768px] md:w-full shadow-sm rounded border">
            <thead className="sticky top-0" >
              <tr className="bg-slate-800" >
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Outlet</th>
                {/* <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Month</th> */}
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Category</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Total Target</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedOutlets?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* {console.log(item.cat_3.toLowerCase())} */}
                  {(item?.cat_3.toLowerCase() == type || type === "all") && <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => toggleRow(index)}>
                    <td className="py-3 px-4 border-b">
                      <div className='flex items-center justify-start gap-2'>
                        <div>

                        {collapsedRows[index] ? <CiSquareMinus className="w-6 h-6" /> : <CiSquarePlus className="w-6 h-6" />}
                        </div>
                        <p>{item.outlet_name}</p>
                      </div>
                    </td>
                    {/* <td className="py-3 px-4 border-b">{item.month}</td> */}
                    <td className="py-3 px-4 border-b">{item.cat_3}</td>
                    <td className="py-3 px-4 border-b">{numFor.format(parseFloat(item.total_target))}</td>
                    <td className="py-3 px-4 border-b">{numFor.format(sumTotalSales(item.outlet_code, item.cat_3))}</td>
                    <td className="py-3 px-4 border-b">{calculateAchievementPercentage(parseFloat(item.total_target), sumTotalSales(item.outlet_code, item.cat_3)).toFixed(2) + "%"}</td>
                  </tr>}
                  {collapsedRows[index] && (
                    <tr className='transition-all'>
                      <td colSpan="5" className="border-b">
                        <div className='flex items-center justify-between p-4 gap-2 bg-slate-50'>
                          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Historical Target Achived</h5>
                            <p className=" text-gray-700 text-lg font-medium">{calculateAchievementPercentage(parseFloat(item.total_target), sumTotalSales(item.outlet_code, item.cat_3)).toFixed(2) + "%"}</p>
                          </div>
                          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Todays Target Achived</h5>
                            <p className=" text-gray-700 text-lg font-medium">{getTodaysTarget(item)}</p>
                          </div>
                          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Tomorrows Target Achived</h5>
                            <p className=" text-gray-700 text-lg font-medium">{getTomorrowsTarget(item)}</p>
                          </div>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr className="bg-slate-700">
                              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Date</th>
                              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Target</th>
                              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived</th>
                              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived %</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {item.achievement_target.map((target, index) => (
                              <tr key={index}>
                                <td className="py-3 px-4 border-b">{target.date}</td>
                                <td className="py-3 px-4 border-b">{numFor.format(parseFloat(target.target))}</td>
                                <td className="py-3 px-4 border-b">{numFor.format(parseFloat(findTotalSales(item.outlet_code, item.cat_3, target.date)))}</td>
                                <td className="py-3 px-4 border-b">{calculateAchievementPercentage(parseFloat(target.target), parseFloat(findTotalSales(item.outlet_code, item.cat_3, target.date))).toFixed(2) + "%"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

  )
}

export default page