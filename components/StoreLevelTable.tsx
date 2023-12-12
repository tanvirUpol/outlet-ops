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
        <table className=" table-fixed w-[500px] md:w-full shadow-sm rounded ">
          <thead className="sticky top-0" >
            <tr className="bg-slate-800" >
              {/* <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"> Code</th> */}
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Outlet Name</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">{type} This</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">{type} Last</th>
              <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">{type} Growth</th>
              {/* Add more headers based on your data */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white" >
            {data.map((item) => (
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