import { useState, useEffect, useRef } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import DropDownFilter from "./DropDownFilter"

// interface Props {
//   data: Array<any>,
//   // setFilteredData: []
//   setFilteredData: any
// }


const Filter = ({data, setFilteredData}) => {
  const filterRef = useRef(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedProfitable, setSelectedProfitablet] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
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

  const filteredDataX = data?.filter(
    (item) => (selectedProfitable.length === 0 ||selectedProfitable.includes(item.profitable))
  );


  // console.log(filteredDataX);


  //  setFilteredData(filteredData)

  // setFilteredData(filteredData)


  useEffect(() => {
   setFilteredData(filteredDataX)
  }, [selectedProfitable])
  

  

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
        className={`filter-bar fixed top-0 right-0 w-60 bg-white shadow-md transform transition-transform duration-300 ease-in-out p-4 ${
          isFilterVisible ? 'translate-x-0' : 'translate-x-full'
        } z-20`}
      >
        {/* Your filter content goes here */}
        <DropDownFilter options={uniqueProfitable} screen={"mobile"} setSelectedValue={setSelectedProfitablet} selectedValue={selectedProfitable} title={"Profitable"} />
        <p className="p-4 h-screen"></p>
      </div>
    </div>
  );
};

export default Filter;