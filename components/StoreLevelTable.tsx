"use client"

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

interface Props {
  data: Array<any>
}


const StoreLevelTable: React.FC<Props> = ({ data }) => {

  const [type, setType] = useState("sales")
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("desc");


  const toggleSort = (column: string) => {
    console.log(column);
    if (column === sortBy) {
      // If the same column is clicked, toggle the sorting direction
      console.log(column);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorting column and default to ascending order
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedOutlets = (data)
    ?.slice().sort((a, b) => {
      const aValue = parseFloat(a[sortBy]);
      const bValue = parseFloat(b[sortBy]);
      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });



  return (
    <div className="my-4 flex flex-col items-stretch">
      <Select value={type} onValueChange={(e) => setType(e)} >
        <SelectTrigger className="w-[150px] md:w-[180px] mb-2" >
          <SelectValue placeholder="Select a File" />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup  >
            <SelectLabel>Formats</SelectLabel>

            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="gpv">GPV</SelectItem>
            <SelectItem value="ff">Foot Fall</SelectItem>


            {/* <SelectItem value="Key Store">Key Store</SelectItem> */}

          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mb-4   rounded auto overflow-scroll h-[80dvh] shadow   relative " >
        <table className=" table-fixed w-[768px] md:w-full shadow-sm rounded ">
          <thead className="sticky top-0" >
            <tr className="bg-slate-800" >
              {/* <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"> Code</th> */}
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Outlet Name</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort( type + "_this")}>{type} This {sortBy === `${type}_this` &&
                (sortOrder === "asc" ? "▲" : " ▼")}</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort( type + "_last")}>{type} Last {sortBy === `${type}_last` &&
                (sortOrder === "asc" ? "▲" : " ▼")}</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort( type + "_growth")} >{type} Growth {sortBy === `${type}_growth`&&
                (sortOrder === "asc" ? "▲" : " ▼")} </th>
              {/* Add more headers based on your data */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white" >
            {sortedOutlets.map((item) => (
              <tr className="cursor-pointer  text-xs transition-colors hover:bg-cyan-100 sm:text-sm" key={item._id}>
                {/* <td className="py-2 px-4 border-b">{item.outlet_code}</td> */}
                <td className="py-3 px-4 border-b max-w-[100px]">{item.outlet_name}</td>
                <td className="py-3 px-4 border-b">{numFor.format((parseFloat(item[type + "_this"])))}</td>
                <td className="py-3 px-4 border-b">{numFor.format(parseFloat(item[type + "_last"]))}</td>
                <td className={`py-3 px-4 border-b ${(item[type + "_growth"] >= 0) ? "text-teal-500" : "text-rose-600"}`}>  {(item.sales_growth > 0) && <span>+</span>}
                  {(item[type + "_growth"]).toFixed(2)} %
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default StoreLevelTable