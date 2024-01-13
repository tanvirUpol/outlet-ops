
"use client"
import { useState, useEffect, useRef } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import DropDownFilter from "./DropDownFilter"

const Filter = ({data, setFilteredData}) => {
  const filterRef = useRef<any>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // console.log(data);

  // filets
  const [selectedProfitable, setSelectedProfitablet] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        closeFilter();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const closeFilter = () => {
    setIsFilterVisible(false);
  };



  // uniqe stuff
  const uniqueProfitable = [
    ...new Set(
      data?.map((item) => {
        return item.profitable;
      })
    ),
  ];
  const uniqueFormat = [
    ...new Set(
      data?.map((item) => {
        return item.outlet_format;
      })
    ),
  ];

  const filteredDataX = data?.filter(
    (item) => ( (selectedProfitable.length === 0 ||selectedProfitable.includes(item.profitable))
        && (selectedFormat.length === 0 ||selectedFormat.includes(item.outlet_format)))
      // return selectedFormat.length === 0 ||selectedFormat.includes(item.outlet_format)    
  );

  // console.log(filteredDataX.length);


  // console.log(filteredDataX);


  //  setFilteredData(filteredData)

  // setFilteredData(filteredData)


  useEffect(() => {
   setFilteredData(filteredDataX)
   console.log(filteredDataX);
  }, [selectedProfitable,selectedFormat])
  


  return (
    <div className="relative">
      <button
        className="flex gap-2 justify-center items-center px-3 py-1 text-sm  shadow border border-gray-100  rounded-md w-fit transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleFilter}
      >
        <BsFilterLeft className="w-6 h-6" />
        <span>Filter</span>
      </button>

      {isFilterVisible && (
        <div className="filter-overlay fixed inset-0 bg-black opacity-40 z-10" onClick={closeFilter}></div>
      )}

      <div
        ref={filterRef}
        className={`filter-bar fixed top-0 right-0 w-60 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isFilterVisible ? 'translate-x-0' : 'translate-x-full'
        } z-20 p-4`}
      >
        <DropDownFilter options={uniqueProfitable} screen={"mobile"} setSelectedValue={setSelectedProfitablet} selectedValue={selectedProfitable} title={"Profitable"} />
        <DropDownFilter options={uniqueFormat} screen={"mobile"} setSelectedValue={setSelectedFormat} selectedValue={selectedFormat} title={"Format"} />
        {/* Your filter content goes here */}
        <p className="p-4 h-screen"></p>
      </div>
    </div>
  );
};

export default Filter;