import { numFor } from "@/utility"
import React, { useState } from "react"
import Link from "next/link"

interface Props {
    data: Array<any>
    category: any,
    type: string
}



const BasicTable: React.FC<Props> = ({ data, category,type }) => {

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
            <div className="mb-4   rounded auto overflow-scroll  shadow   relative max-h-[50dvh]" >
                <table className=" table-fixed w-[768px] md:w-full shadow-sm rounded ">
                    <thead className="sticky top-0" >
                        <tr className="bg-slate-800" >
                            {/* <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"> Code</th> */}
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">{category.name}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_this")}>{type} This {sortBy === `${type}_this` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_last")}>{type} Last {sortBy === `${type}_last` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_growth")} >{type} Growth {sortBy === `${type}_growth` &&
                                (sortOrder === "asc" ? "▲" : " ▼")} </th>
                            {/* Add more headers based on your data */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white" >
                        {sortedOutlets.map((item,index) => (
                             <React.Fragment key={index}>

                               {item[category.key] !== "44-HOME DELIVERY" && item[category.key] !== "Undf# 2" && item[category.key] !== "0" && item[category.key] !== "Not assigned" && <tr className=" text-xs transition-colors hover:bg-cyan-100 sm:text-sm" key={item._id}>
                                    {/* <td className="py-2 px-4 border-b">{item.outlet_code}</td> */}
                                    <td className="py-3 px-4 border-b max-w-[100px]">
                                        <Link className="cursor-pointer" href={`/outlet/${item.outlet_code}`}>
                                            {item[category.key]}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4 border-b">{numFor.format((parseFloat(item[type + "_this"])))}</td>
                                    <td className="py-3 px-4 border-b">{numFor.format(parseFloat(item[type + "_last"]))}</td>
                                    <td className={`py-3 px-4 border-b ${(item[type + "_growth"] >= 0) ? "text-teal-500" : "text-rose-600"}`}>  {(item.sales_growth > 0) && <span>+</span>}
                                        {(item[type + "_growth"]).toFixed(2)} %
                                    </td>

                                </tr>}
                             </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}

export default BasicTable