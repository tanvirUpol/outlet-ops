import { numFor } from "@/utility"
import React, { useState } from "react"
import SearchBar from "./SearchBar"

interface Props {
    data: Array<any>
    category: any,
    type: string
}



const BasicTable: React.FC<Props> = ({ data, category, type }) => {
//  console.log(data);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("desc");
    const [searchResults, setSearchResults] = useState([]);

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

    // console.log(data[3]);


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
            outlet.cat_3.toLowerCase().includes(query.toLowerCase()) || outlet.master_category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results as any);
    };

    return (
        <div className="my-4 space-y-2">
            { category.key !== "master_category" && <SearchBar placeHolder="Search by master category or category 3" handleSearch={handleSearch} />}
            <div className="mb-4   rounded auto overflow-scroll  shadow   relative max-h-[50dvh]" >
                <table className=" table-fixed w-[1090px] lg:w-full shadow-sm rounded ">
                    <thead className="sticky top-0" >
                        <tr className="bg-slate-800" >
                            {/* <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"> Code</th> */}
                           {category.key === "cat_3" && <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">Master Category</th>}
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">{category.name}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort("sales_contribution")}>Sales Cont.{sortBy === `sales_contribution` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort("bench_sales_contribution")}> Bench Sales Cont. {sortBy === `bench_sales_contribution` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_this")}>{type} This {sortBy === `${type}_this` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_diff")}>{type} Value {sortBy === `${type}_diff` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort(type + "_growth")} >{type} Growth {sortBy === `${type}_growth` &&
                                (sortOrder === "asc" ? "▲" : " ▼")} </th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort("gp_percent")}>GP % {sortBy === `gp_percent` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer" onClick={() => toggleSort("bench_gp_percent")}>Bench GP % {sortBy === `bench_gp_percent` &&
                                (sortOrder === "asc" ? "▲" : " ▼")}</th>
                            {/* Add more headers based on your data */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white font-medium" >
                        {sortedOutlets.map((item, index) => (
                            <React.Fragment key={index}>

                                {item[category.key] !== "44-HOME DELIVERY" && item[category.key] !== "Undf# 2" && item[category.key] !== "0" && item[category.key] !== "Not assigned" && <tr className=" text-xs transition-colors hover:bg-cyan-100 sm:text-sm" key={item._id}>
                                    {/* <td className="py-2 px-4 border-b">{item.outlet_code}</td> */}
                                   {category.key === "cat_3" && <td className="py-3 px-4 border-b ">
                                        {item["master_category"]}
                                    </td>}
                                    <td className="py-3 px-4 border-b ">
                                        {item[category.key]}
                                    </td>
                                    <td className={`py-3 px-4 border-b ${(item["sales_contribution"] >= 0) ? "text-teal-500" : "text-rose-600"}`}>{((parseFloat(item["sales_contribution"])).toFixed(2))}%</td>
                                    <td className={`py-3 px-4 border-b ${(item["bench_sales_contribution"] >= 0) ? "text-teal-500" : "text-rose-600"}`}>{Object.is(item["bench_sales_contribution"], NaN) ? "N/A" : (parseFloat(item["bench_sales_contribution"]).toFixed(2))}%</td>
                                    <td className="py-3 px-4 border-b">{numFor.format((parseFloat(item[type + "_this"])))}</td>
                                    <td className="py-3 px-4 border-b">{numFor.format(parseFloat(item[type + "_diff"]))}</td>
                                    <td className={`py-3 px-4 border-b ${(item[type + "_growth"] >= 0) ? "text-teal-500" : "text-rose-600"}`}>  {(item[type + "_growth"] > 0) && <span>+</span>}
                                        {(item[type + "_growth"]).toFixed(2)} %
                                    </td>
                                    <td className="py-3 px-4 border-b">{numFor.format((item["gp_percent"].toFixed(2)))}%</td>
                                    <td className="py-3 px-4 border-b">{Object.is(item["bench_gp_percent"], NaN) ? "N/A" : numFor.format((item["bench_gp_percent"].toFixed(2)))}%</td>

                                </tr>}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BasicTable