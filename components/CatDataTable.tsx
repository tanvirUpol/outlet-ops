"use client"

import React, { useState } from 'react'
import { addGrowth, calculateNormalPercentage } from '@/utility'

interface Props {
    masterCategoryData: Array<any>
    cat1Data: Array<any>
    data: Array<any>
}

const CatDataTable: React.FC<Props> = ({ masterCategoryData, cat1Data, data }) => {

    const [expandedMaster, setExpandedMaster] = useState("");
    const [expandedCat1, setExpandedCat1] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("");
    const [selectedMetric, setSelectedMetric] = useState("sales");


    const masterCategoryDataUpdated = addGrowth(masterCategoryData)
    const cat1DataUpdated = addGrowth(cat1Data)
    const cat3DataUpdated = addGrowth(data)

    console.log(masterCategoryDataUpdated[2]);


    const toggleMaster = (masterCategory: string) => {
        if (expandedMaster === masterCategory) {
            setExpandedMaster("");
        } else {
            setExpandedMaster(masterCategory);
        }
    };

    // console.log(expandedMaster);

    const toggleCat1 = (cat1Value: string) => {
        if (expandedCat1 === cat1Value) {
            setExpandedCat1("");
        } else {
            setExpandedCat1(cat1Value);
        }
    };




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

    const sortedOutletsCat3 = (cat3DataUpdated)
        ?.slice().sort((a, b) => {
            const aValue = parseFloat(a[sortBy]);
            const bValue = parseFloat(b[sortBy]);
            if (sortOrder === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });
    const sortedOutletsCat1 = (cat1DataUpdated)
        ?.slice().sort((a, b) => {
            const aValue = parseFloat(a[sortBy]);
            const bValue = parseFloat(b[sortBy]);
            if (sortOrder === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });
    const sortedOutletsMaster = (masterCategoryDataUpdated)
        ?.slice().sort((a, b) => {
            const aValue = parseFloat(a[sortBy]);
            const bValue = parseFloat(b[sortBy]);
            if (sortOrder === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });



    const numFor = Intl.NumberFormat("en-US");

    return (
        <div>
            <div className="flex items-center justify-start gap-2">
                <h1>Filter:</h1>
                <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="block w-44 rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm font-medium  text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="bs">Basket Size</option>
                    <option value="sales">Sales</option>
                    <option value="gpv">POS GPV</option>
                </select>
            </div>
            <div className='rounded mt-5  overflow-y-hidden border'>
                <table className=" table-fixed min-w-full shadow-sm ">
                    <thead>
                        <tr className="bg-slate-900 text-left">
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider lg:w-[500px] text-white">
                                Master Category
                            </th>
                            <th onClick={() => toggleSort(selectedMetric + "_this")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} This {sortBy === `${selectedMetric}_this` && (sortOrder === "asc" ? "▲" : " ▼")}
                            </th>
                            <th onClick={() => toggleSort(selectedMetric + "_last")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} Last {sortBy === `${selectedMetric}_last` && (sortOrder === "asc" ? "▲" : " ▼")}
                            </th>
                            <th onClick={() => toggleSort(selectedMetric + "_growth")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                {selectedMetric} Growth % {sortBy === `${selectedMetric}_growth` && (sortOrder === "asc" ? "▲" : " ▼")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {sortedOutletsMaster.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.master_category !== "44-HOME DELIVERY" && item.master_category !== "Undf# 2" && (
                                    <>
                                        <tr
                                            onClick={() => toggleMaster(item.master_category)}
                                            className="cursor-pointer text-xs transition-colors hover:bg-teal-100 sm:text-sm"
                                        >
                                            <td className="p-3 flex items-center">
                                                <button
                                                    onClick={() => toggleMaster(item.master_category)}
                                                    className="mr-2 focus:outline-none font-medium text-sm"
                                                >
                                                    {expandedMaster === item.master_category ? "-" : "+"}
                                                </button>
                                                <span>
                                                    {item.master_category}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {numFor.format(item[selectedMetric + "_this"])}
                                            </td>
                                            <td className="p-3">
                                                {numFor.format(item[selectedMetric + "_last"])}
                                            </td>
                                            <td className={`p-3 ${item[selectedMetric + "_growth"]<
                                                0 ? "text-rose-500" : "text-green-600"} font-medium`}>
                                                {numFor.format(item[selectedMetric + "_growth"])}%
                                            </td>
                                        </tr>
                                        <tr>
                                            {expandedMaster === item.master_category && (
                                                <td colSpan={4} className="py-4">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="bg-slate-700">
                                                                <th className="px-4 py-3 lg:w-[500px] text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                    CAT 1
                                                                </th>
                                                                <th onClick={() => toggleSort(selectedMetric + "_this")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                    {selectedMetric} This {sortBy === `${selectedMetric}_this` && (sortOrder === "asc" ? "▲" : " ▼")}
                                                                </th>
                                                                <th onClick={() => toggleSort(selectedMetric + "_last")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                    {selectedMetric} Last {sortBy === `${selectedMetric}_last` && (sortOrder === "asc" ? "▲" : " ▼")}
                                                                </th>
                                                                <th onClick={() => toggleSort(selectedMetric + "_growth")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                    {selectedMetric} Growth % {sortBy === `${selectedMetric}_growth` && (sortOrder === "asc" ? "▲" : " ▼")}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {sortedOutletsCat1.map((item, index) => (
                                                                <React.Fragment key={index}>
                                                                    {item.master_category === expandedMaster && (
                                                                        <>
                                                                            <tr
                                                                                onClick={() => toggleCat1(item.cat_1)}
                                                                                className="cursor-pointer text-xs transition-colors bg-slate-50 hover:bg-slate-100 sm:text-sm"
                                                                            >
                                                                                <td className="p-3 flex items-center">
                                                                                    <button
                                                                                        onClick={() => toggleCat1(item.cat_1)}
                                                                                        className="mr-2 focus:outline-none font-medium text-sm"
                                                                                    >
                                                                                        {expandedCat1 === item.cat_1 ? "-" : "+"}
                                                                                    </button>
                                                                                    <span>
                                                                                        {item.cat_1}
                                                                                    </span>
                                                                                </td>
                                                                                <td className="p-3">
                                                                                    {numFor.format(item[selectedMetric + "_this"])}
                                                                                </td>
                                                                                <td className="p-3">
                                                                                    {numFor.format(item[selectedMetric + "_last"])}
                                                                                </td>
                                                                                <td className={`p-3  ${item[selectedMetric + "_growth"] <
                                                                                    0 ? "text-rose-500" : "text-green-600"} font-medium`}>
                                                                                    {numFor.format(item[selectedMetric + "_growth"])}%
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                {expandedCat1 === item.cat_1 && (
                                                                                    <td colSpan={4} className="py-4">
                                                                                        <table className="w-full shadow">
                                                                                            <thead>
                                                                                                <tr className="bg-slate-600">
                                                                                                    <th className="px-4 py-3 lg:w-[500px] text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                                                        CAT 3
                                                                                                    </th>
                                                                                                    <th onClick={() => toggleSort(selectedMetric + "_this")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                                                        {selectedMetric} This {sortBy === `${selectedMetric}_this` && (sortOrder === "asc" ? "▲" : " ▼")}
                                                                                                    </th>
                                                                                                    <th onClick={() => toggleSort(selectedMetric + "_last")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                                                        {selectedMetric} Last {sortBy === `${selectedMetric}_last` && (sortOrder === "asc" ? "▲" : " ▼")}
                                                                                                    </th>
                                                                                                    <th onClick={() => toggleSort(selectedMetric + "_growth")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                                                                                                        {selectedMetric} Growth % {sortBy === `${selectedMetric}_growth` && (sortOrder === "asc" ? "▲" : " ▼")}
                                                                                                    </th>
                                                                                                    {/* <th onClick={() => toggleSort("format_" + selectedMetric + "_gr")} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white cursor-pointer">
                                                                                                            Benchmark {selectedMetric} % {sortBy === ("format_" + selectedMetric + "_gr") && (sortOrder === 'asc' ? '▲' : '▼')}
                                                                                                        </th> */}
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {sortedOutletsCat3.map((item, index) => (
                                                                                                    <React.Fragment key={index}>
                                                                                                        {item.master_category ===
                                                                                                            expandedMaster && (
                                                                                                                <tr className="cursor-pointer text-xs transition-colors bg-slate-50 hover:bg-slate-100 sm:text-sm">
                                                                                                                    <td className="p-3">
                                                                                                                        {item.cat_3}
                                                                                                                    </td>
                                                                                                                    <td className="p-3">
                                                                                                                        {numFor.format((item[
                                                                                                                            selectedMetric + "_this"
                                                                                                                        ]))}
                                                                                                                    </td>
                                                                                                                    <td className="p-3">
                                                                                                                        {numFor.format(item[
                                                                                                                            selectedMetric + "_last"
                                                                                                                        ])}
                                                                                                                    </td>
                                                                                                                    <td className={`p-3  ${item[selectedMetric + "_growth"] <
                                                                                                                        0 ? "text-rose-500" : "text-green-600"} font-medium`}>
                                                                                                                        {numFor.format(item[selectedMetric + "_growth"])}%
                                                                                                                    </td>

                                                                                                                </tr>
                                                                                                            )}
                                                                                                    </React.Fragment>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                )}
                                                                            </tr>
                                                                        </>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            )}
                                        </tr>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default CatDataTable