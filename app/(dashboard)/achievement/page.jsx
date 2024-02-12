"use client"

import React, { useState, useEffect } from 'react';
import { GrTrophy } from "react-icons/gr";

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
import { useSession } from 'next-auth/react';
import { CgSpinnerTwo } from "react-icons/cg";

// const formatMonth = (date) => {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Note: getMonth() returns 0-based index
//   return `${year}-${month}`;
// };


// total card functions
function flipDate(date) {
  const [day, month, year] = date.split("-");
  return (`${year}-${month}-${day}`)
}



function calculateTotalTargetSum(objArray, salesData) {

  console.log(objArray, salesData);

  const dateObjects = salesData.map(item => {
    const [day, month, year] = item.date.split('-');
    return new Date(`${year}-${month}-${day}`);
  });


  const lastUpdated =new Date( Math.max(...dateObjects));

  // let totalSum = 0;

  // for (let i = 0; i < objArray.length; i++) {
  //   let targetDate = new Date(flipDate(objArray[i].achievement_target[0].date));
  //   if (targetDate <= lastUpdated){
  //     console.log(targetDate , lastUpdated);
  //     totalSum += objArray[i].total_target;
  //   }
  // }



  // console.log(totalSum);

  let totalTargetUntilYesterday = 0;
  for (let i = 0; i < objArray.length; i++) {
    for (const target of objArray[i].achievement_target) {
      const targetDate = new Date(flipDate(target.date));
  
      if (targetDate <= lastUpdated) {
        // console.log("hello");
        totalTargetUntilYesterday += target.target;
      }
    }
  }


  return totalTargetUntilYesterday;
}



function calculateTotalSalesSum(objArray) {
  console.log(objArray);
  let totalSum = 0;
  for (let i = 0; i < objArray.length; i++) {
    totalSum += objArray[i].total_sales;
  }
  return totalSum;
}





const page = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentDate = new Date();
    const formattedMonth = currentDate.toISOString().slice(0, 7); // Extracts the year-month part
    return formattedMonth;
  });
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [data, setData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedRows, setCollapsedRows] = useState([]);
  const [type, setType] = useState("all")
  const [searchResults, setSearchResults] = useState([]);
  const [totalTarget, setTotalTarget] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [activeTab, setActiveTab] = useState('historical'); // Initial active tab

  const { data: session } = useSession()


  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Set the start date to the first day of the current month in Bangladesh timezone
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    setStartDate(formatDate2(startOfMonth));

    // Set the end date to the last day of the current month in Bangladesh timezone
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    setEndDate(formatDate2(lastDayOfMonth));
  }, []);

  // Function to format the date as 'YYYY-MM-DD'
  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };





  const handleTabClick = (tab) => {
    // Get the current date
    const currentDate = new Date();

    // Set the start date to the first day of the current month in Bangladesh timezone
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    setStartDate(formatDate2(startOfMonth));

    // Set the end date to the last day of the current month in Bangladesh timezone
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    setEndDate(formatDate2(lastDayOfMonth));
    setActiveTab(tab);
  };

  const findTotalSales = (outletCode, category, date) => {
    // console.log(outletCode, category, date);
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


  function calculateAchievementPercentage(target, achieved) {
    // console.log(target, achieved);
    if (target <= 0) {
      throw new Error("Target value must be greater than zero");
    }

    if (achieved < 0) {
      throw new Error("Achieved value cannot be negative");
    }

    const percentage = (achieved / target) * 100;
    return percentage; // Ensure the percentage does not exceed 100%
  }



  const sumTotalSalesTillYesterday = (outletCode, category) => {
    const today = new Date();

    const filteredItems = invoiceData.filter(item => {
      const [day, month, year] = item.date.split("-");
      return (
        item.outlet_code === outletCode &&
        item.cat_3.toLowerCase() === category.toLowerCase() &&
        new Date(`${year}-${month}-${day}`) < today)
    }

    );

    // console.log(filteredItems);

    const totalSalesSum = filteredItems.reduce((sum, item) => sum + item.total_sales, 0);
    // console.log(totalSalesSum);
    return totalSalesSum;
  };


  const findHighestDate = () => {

    const dateObjects = invoiceData.map(item => {
      const [day, month, year] = item.date.split('-');
      return new Date(`${year}-${month}-${day}`);
    });


    console.log(Math.max(...dateObjects));

    return Math.max(...dateObjects) < 0 ? null : new Date(Math.max(...dateObjects));

  };


  const yesterdayDate = findHighestDate();



  function getBreakingPoint(date) {
    const targetDate = new Date(flipDate(date));
    const breakDate = findHighestDate();
    return targetDate <= breakDate;
  }

  function checkStartDate(date) {
    const targetDate = new Date(flipDate(date));

    // Extracting year, month, and day from startDate
    const startDateObject = new Date(startDate);
    const startYear = startDateObject.getFullYear();
    const startMonth = startDateObject.getMonth();
    const startDay = startDateObject.getDate();

    // Creating a new Date object with the same year, month, and day but with time set to midnight
    const adjustedStartDate = new Date(startYear, startMonth, startDay, 0, 0, 0, 0);

    return targetDate >= adjustedStartDate;
  }

  function checkEndDate(date) {
    const targetDate = new Date(flipDate(date));

    // Extracting year, month, and day from endDate
    const endDateObject = new Date(endDate);
    const endYear = endDateObject.getFullYear();
    const endMonth = endDateObject.getMonth();
    const endDay = endDateObject.getDate();

    // Creating a new Date object with the same year, month, and day but with time set to midnight
    const adjustedEndDate = new Date(endYear, endMonth, endDay, 0, 0, 0, 0);

    return targetDate <= adjustedEndDate;
  }



  function getTotalTargetUntilYesterday(data) {
    let totalTargetUntilYesterday = 0;

    for (const target of data.achievement_target) {
      const targetDate = new Date(flipDate(target.date));

      if (targetDate <= yesterdayDate) {
        // console.log("hello");
        totalTargetUntilYesterday += target.target;
      }
    }

    // console.log(totalTargetUntilYesterday);

    return totalTargetUntilYesterday;
  }


  // function getTotalTargetUntilYesterday(data) {
  //   const today = new Date();
  //   const yesterday = new Date(today);
  //   yesterday.setDate(yesterday.getDate() - 1);

  //   const formattedYesterday = formatDate(yesterday);

  //   // console.log(formattedYesterday);

  //   const achievementTargets = data.achievement_target;

  //   // console.log(achievementTargets);

  //   let totalTargetUntilYesterday = 0;

  //   for (const target of achievementTargets) {
  //     const targetDate = new Date(flipDate(target.date));
  //     const yesterdayDate = new Date(flipDate(formattedYesterday));
  //     // console.log(target);
  //     // console.log(targetDate);
  //     // console.log(yesterdayDate);

  //     if (targetDate <= yesterdayDate) {
  //       // console.log("hello");
  //       totalTargetUntilYesterday += target.target;
  //     }
  //   }

  //   console.log(totalTargetUntilYesterday);

  //   return totalTargetUntilYesterday;
  // }
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
        setTotalSales(calculateTotalSalesSum(result?.InvData))
        setTotalTarget(calculateTotalTargetSum(result?.achData, result.InvData))
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


  const handleType = (e) => {

    if(e !== "all" ){

        const results = data.filter((outlet) =>
        outlet.cat_3.toLowerCase() === e.toLowerCase()
      );
      const resultsInv = invoiceData.filter((outlet) =>
        outlet.cat_3.toLowerCase() === e.toLowerCase()
      );
      setTotalSales(calculateTotalSalesSum(resultsInv))
      setTotalTarget(calculateTotalTargetSum(results, resultsInv))
    }else {
      setTotalSales(calculateTotalSalesSum(invoiceData))
      setTotalTarget(calculateTotalTargetSum(data, invoiceData))
    }

    setCollapsedRows([])
    setType(e)
  }

  // || outlet.outlet_name.toLowerCase().includes(query.toLowerCase())
  const handleSearch = (query) => {
    const results = data.filter((outlet) =>
      outlet.outlet_code.toLowerCase().includes(query.toLowerCase()) 
    );
    const resultsInv = invoiceData.filter((outlet) =>
      outlet.outlet_code.toLowerCase().includes(query.toLowerCase()) 
    );

    console.log(results);
    setSearchResults(results);
    setTotalSales(calculateTotalSalesSum(resultsInv))
    setTotalTarget(calculateTotalTargetSum(results, resultsInv))
  };

  const sortedOutlets = (searchResults.length > 0 ? searchResults : data)

  // console.log(session?.user);


  return (
    <div className="w-full p-4 mb-4">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <GrTrophy className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Store PNP Achievements</h1>
      </div>
      <div className="w-full">
        <div className='flex flex-col justify-start items-start gap-2 sm:flex-row w-full sm:items-center sm:justify-between mb-4 '>
          <div className="flex justify-start items-center gap-3">
            <div className="flex items-center justify-end">
              <div className='flex items-center gap-2'>
                <h1 className="text-base  font-bold"> Month</h1>
                <input
                  type='month'
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                />
              </div>
            </div>
            <p>{yesterdayDate ? yesterdayDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Loading..."}</p>
          </div>
          <div className="flex justify-start gap-2 items-center mb-2">
            <SearchBar handleSearch={handleSearch} placeHolder="Search by name or code" />
            <Select value={type} onValueChange={(e) => handleType(e)} >
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

        {loading &&
          <div className="text-gray-600 flex justify-center items-center w-full text-center h-[72dvh]">
            <CgSpinnerTwo className="w-40 h-40 animate-spin" />
          </div>
        }
        {error && <p className="text-red-500">{error}</p>}

        {!loading && <div className='flex  justify-between p-4 gap-2 '>
          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">Total Target</h5>
            <p className=" text-gray-700 text-xl font-medium">{numFor.format(Math.ceil(totalTarget))}</p>
          </div>
          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">Total Sales</h5>
            <p className=" text-gray-700 text-xl font-medium">{numFor.format(Math.ceil(totalSales))}</p>
          </div>

          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">Achived</h5>
            <p className=" text-gray-700 text-xl font-medium">{calculateAchievementPercentage(totalTarget, totalSales).toFixed(2) + "%"}</p>
          </div>
        </div>}




        {sortedOutlets.length > 0 && (
          <table className=" table-fixed w-[768px] md:w-full shadow-sm rounded border">
            <thead className="sticky top-0" >
              <tr className="bg-slate-800" >
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Outlet</th>
                {/* <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Month</th> */}
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Category</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Total Target</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Last Total Target</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived</th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived %</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm divide-gray-200 bg-white">
              {sortedOutlets?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* {console.log(item.cat_3.toLowerCase())} */}
                  {(session?.user?.outlets.includes(item.outlet_code) || session?.user?.outlets.length === 0) && (item?.cat_3.toLowerCase() == type || type === "all") && <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => toggleRow(index)}>
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
                    <td className="py-3 px-4 border-b">{numFor.format(Math.ceil(parseFloat(item.total_target)))}</td>
                    <td className="py-3 px-4 border-b">{numFor.format(Math.ceil(getTotalTargetUntilYesterday(item, item.cat_3)))}</td>
                    <td className="py-3 px-4 border-b">{numFor.format(Math.ceil(sumTotalSales(item.outlet_code, item.cat_3)))}</td>
                    {/* <td className="py-3 px-4 border-b">{calculateAchievementPercentage(parseFloat(item.total_target), sumTotalSales(item.outlet_code, item.cat_3)).toFixed(2) + "%"}</td> */}
                    <td className="py-3 px-4 border-b">{calculateAchievementPercentage(getTotalTargetUntilYesterday(item), sumTotalSalesTillYesterday(item.outlet_code, item.cat_3)).toFixed(2) + "%"}</td>
                  </tr>}
                  {collapsedRows[index] && (
                    <tr className={`${collapsedRows[index] ? "activeDropdown" : ""}`}>
                      <td colSpan="6" className="border-b m-2">
                        {/* date picker range */}
                        <div className='flex px-4 mt-2 gap-3'>
                          <div className='flex items-center gap-2 bg'>
                            <h1 className="text-sm font-medium">From</h1>
                            <input
                              type='date'
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className='bg-white'
                            />
                          </div>
                          <div className='flex items-center gap-2'>
                            <h1 className="text-sm font-medium">To</h1>
                            <input
                              type='date'
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className='bg-white'
                            />
                          </div>
                        </div>
                        <div className='flex  justify-between p-4 gap-2 '>
                          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">Till Date Achived</h5>
                            <p className=" text-gray-700 text-xl font-medium">{calculateAchievementPercentage(getTotalTargetUntilYesterday(item), sumTotalSalesTillYesterday(item.outlet_code, item.cat_3)).toFixed(2) + "%"}</p>
                            <div className='flex items-center justify-start font-medium gap-2 mt-2 text-green-500'>
                              <h1>{numFor.format(Math.ceil(sumTotalSalesTillYesterday(item.outlet_code, item.cat_3)))} <span className='text-slate-800'> out of  </span>
                                {numFor.format(Math.ceil(getTotalTargetUntilYesterday(item, item.cat_3)))}</h1>
                            </div>

                          </div>
                          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

                            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">Todays Target</h5>
                            <p className=" text-gray-700 text-xl font-medium">{Math.ceil(getTodaysTarget(item))}</p>
                          </div>
                          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

                            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">Tomorrows Target</h5>
                            <p className=" text-gray-700 text-lg font-medium">{Math.ceil(getTomorrowsTarget(item))}</p>
                          </div>
                        </div>

                        {/* tabs */}
                        <div className='flex justify-between gap-1 w-full'>
                          <p
                            className={`w-full p-3 text-base  font-medium text-center  cursor-pointer ${activeTab === 'historical' ? 'activeB-left' : 'inactiveB'
                              }`}
                            onClick={() => handleTabClick('historical')}
                          >
                            Historical Data
                          </p>
                          <p
                            className={`w-full p-3 text-base  font-medium text-center cursor-pointer ${activeTab === 'future' ? 'activeB-right' : 'inactiveB'
                              }`}
                            onClick={() => handleTabClick('future')}
                          >
                            Future Data
                          </p>
                        </div>


                        <table className="w-full table-fixed">
                          <thead>
                            <tr className="bg-slate-700">
                              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-white">Date</th>
                              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-white">Target</th>
                              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived</th>
                              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-white">Achived %</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-salte-50 font-medium">
                            {item.achievement_target.map((target, index) => (
                              <React.Fragment key={index}>
                                {activeTab === 'historical' && getBreakingPoint(target.date) && checkStartDate(target.date) && checkEndDate(target.date) && <tr className='font-medium'>
                                  <td className="py-3 px-4 border-b">{new Date(flipDate(target.date)).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</td>
                                  <td className="py-3 px-4 border-b">{numFor.format(Math.ceil(parseFloat(target.target)))}</td>
                                  <td className="py-3 px-4 border-b">{numFor.format(Math.ceil((parseFloat(findTotalSales(item.outlet_code, item.cat_3, target.date)))))}</td>
                                  <td className="py-3 px-4 border-b">{calculateAchievementPercentage(parseFloat(target.target), parseFloat(findTotalSales(item.outlet_code, item.cat_3, target.date))).toFixed(2) + "%"}</td>
                                </tr>}
                                {activeTab === 'future' && !getBreakingPoint(target.date) && checkStartDate(target.date) && checkEndDate(target.date) && <tr>
                                  <td className="py-3 px-4 border-b">{new Date(flipDate(target.date)).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</td>
                                  <td className="py-3 px-4 border-b">{numFor.format(Math.ceil(parseFloat(target.target)))}</td>
                                  <td className="py-3 px-4 border-b">{numFor.format(Math.ceil((parseFloat(findTotalSales(item.outlet_code, item.cat_3, target.date)))))}</td>
                                  <td className="py-3 px-4 border-b">{calculateAchievementPercentage(parseFloat(target.target), parseFloat(findTotalSales(item.outlet_code, item.cat_3, target.date))).toFixed(2) + "%"}</td>
                                </tr>}
                              </React.Fragment>
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