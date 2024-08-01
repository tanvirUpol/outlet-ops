"use client"
import { GrOverview } from "react-icons/gr";
import { numFor } from "@/utility"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"
import SearchBar from "./SearchBar"

interface Props {
  data: Array<any>
}


const StoreLevelTable: React.FC<Props> = ({ data }) => {

  const [type, setType] = useState("sales")
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("desc");
  const [searchResults, setSearchResults] = useState([]);


  const toggleSort = (column: string) => {
    // console.log(column);
    if (column === sortBy) {
      // If the same column is clicked, toggle the sorting direction
      // console.log(column);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorting column and default to ascending order
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedOutlets = (searchResults.length > 0 ? searchResults : data)
    ?.slice().sort((a, b) => {
      const aValue = parseFloat(a[sortBy]);
      const bValue = parseFloat(b[sortBy]);
      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

  const handleSearch = (query: string) => {
    const results = data.filter((outlet) =>
      outlet.outlet_code.toLowerCase().includes(query.toLowerCase()) || outlet.outlet_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results as any);
  };

  return (
    <div className="mb-4 mt-8 flex flex-col items-stretch w-full bg">
      <div className="flex justify-between w-full items-center">

      <div className="flex items-center  gap-2 p-1 text-gray-800 ">
          <GrOverview className="w-5 h-5" />
          <h1 className="text-xl font-bold">Dashboard</h1>
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
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="gpv">GPV</SelectItem>
                <SelectItem value="ff">Foot Fall</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>
      </div>
      <div className="mb-4   rounded auto overflow-scroll h-[80dvh] shadow   relative " >
        <table className=" table-fixed w-[768px] md:w-full shadow-sm rounded ">
          <thead className="sticky top-0" >
            <tr className="bg-slate-800" >
              {/* <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"> Code</th> */}
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Outlet Name</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_this")}>{type} This {sortBy === `${type}_this` &&
                (sortOrder === "asc" ? "▲" : " ▼")}</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_last")}>{type} Last {sortBy === `${type}_last` &&
                (sortOrder === "asc" ? "▲" : " ▼")}</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_growth")} >{type} Growth {sortBy === `${type}_growth` &&
                (sortOrder === "asc" ? "▲" : " ▼")} </th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Outlet Format</th>
              {/* Add more headers based on your data */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white" >
            {sortedOutlets.map((item) => (
              <tr className=" text-xs transition-colors hover:bg-cyan-100 sm:text-sm" key={item._id}>
                {/* <td className="py-2 px-4 border-b">{item.outlet_code}</td> */}
                <td className="py-3 px-4 border-b max-w-[100px]">
                  <p className="cursor-pointer  underline underline-offset-2">
                    {item.outlet_name}
                  </p>
                </td>
                <td className="py-3 px-4 border-b">{numFor.format((parseFloat(item[type + "_this"])))}</td>
                <td className="py-3 px-4 border-b">{numFor.format(parseFloat(item[type + "_last"]))}</td>
                <td className={`py-3 px-4 border-b ${(item[type + "_growth"] >= 0) ? "text-teal-500" : "text-rose-600"}`}>  {(item.sales_growth > 0) && <span>+</span>}
                  {(item[type + "_growth"]).toFixed(2)} %
                </td>
                <td className="py-3 px-4 border-b">{item["outlet_format"]}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default StoreLevelTable