"use client"

import Download from "@/components/Download";
import Filter from "@/components/Filter";
import GrowthCard from "@/components/GrowthCard";
import SearchBar from "@/components/SearchBar";
import { MdDashboard } from "react-icons/md";
import SimpleCard from "./SimpleCard";
import StoreLevelTable from "./StoreLevelTable";
import { sumFunctionAnyStores, calculateDiff, calculateTotalPercentage, storeGrowth, storeDeGrowth, calculateNormalPercentage } from "@/utility";
import { useState } from "react";


interface Props {
  data: Array<any>
}

const Dashboard: React.FC<Props> = ({ data }) => {

  // console.log(catData);
  const [searchResults, setSearchResults] = useState([]);

  const updatedData = data?.map(item => ({
    ...item,
    sales_growth: calculateNormalPercentage(item.sales_this, item.sales_last),
    gpv_growth: calculateNormalPercentage(item.gpv_this, item.gpv_last),
    ff_growth: calculateNormalPercentage(item.ff_this, item.ff_last),
  }));
  

  // console.log(updatedData);

  const allStore = updatedData.filter((obj) => parseFloat(obj["ff_this"]) >= 0);
  const sameStore = updatedData.filter((obj) => parseFloat(obj["ff_this"]) > 0 && parseFloat(obj["ff_last"]) > 0);

  const BSThisAll = sumFunctionAnyStores(allStore, "sales_this") / sumFunctionAnyStores(allStore, "ff_this")
  const BSLastAll = sumFunctionAnyStores(allStore, "sales_last") / sumFunctionAnyStores(allStore, "ff_last")
  const BSThisSame = sumFunctionAnyStores(sameStore, "sales_this") / sumFunctionAnyStores(sameStore, "ff_this")
  const BSLastSame = sumFunctionAnyStores(sameStore, "sales_last") / sumFunctionAnyStores(sameStore, "ff_last")


  const totalProfitableStores = updatedData.filter(
    (item) => item.profitable.toLowerCase() === "profitable"
  ).length;

  const totalNonProfitableStores = updatedData.filter(
    (item) => item.profitable.toLowerCase() !== "profitable"
  ).length;


  return (
    <main className="">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4 text-gray-800 ">
          <MdDashboard className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="w-full my-4 flex flex-col md:flex-row  items-start md:items-center justify-between ">
          <SearchBar />
          <div className="flex justify-between gap-4 w-full md:w-auto">
            <Download data={data} fileName="Store Level Data"/>
            <Filter />
          </div>
        </div>
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[1080px]:grid-cols-4 w-full gap-2 " >
          <SimpleCard title="All Stores" mainData={allStore.length} path="#" />
          <SimpleCard title="Same Stores" mainData={sameStore.length} path="#" />
          <SimpleCard title="Profitable Stores" mainData={totalProfitableStores} path="#" />
          <SimpleCard title="Non Prof. Stores" mainData={totalNonProfitableStores} path="#" />

          {/* ------------------------------------ */}
          <GrowthCard growthCount={storeGrowth(allStore, "sales_this", "sales_last")} deGrowthCount={storeDeGrowth(allStore, "sales_this", "sales_last")} title="All Store Sales" mainData={sumFunctionAnyStores(allStore, "sales_this")} diff={calculateDiff(allStore, "sales_this", "sales_last")} path="/" percentage={calculateTotalPercentage(allStore, "sales_this", "sales_last")} />

          <GrowthCard growthCount={storeGrowth(sameStore, "sales_this", "sales_last")} deGrowthCount={storeDeGrowth(sameStore, "sales_this", "sales_last")} title="Same Store Sales" mainData={sumFunctionAnyStores(sameStore, "sales_this")} diff={calculateDiff(sameStore, "sales_this", "sales_last")} path="/" percentage={calculateTotalPercentage(sameStore, "sales_this", "sales_last")} />

          <GrowthCard growthCount={storeGrowth(allStore, "ff_this", "ff_last")} deGrowthCount={storeDeGrowth(allStore, "ff_this", "ff_last")} title="All Store FootFall" mainData={sumFunctionAnyStores(allStore, "ff_this")} diff={calculateDiff(allStore, "ff_this", "ff_last")} path="/" percentage={calculateTotalPercentage(allStore, "ff_this", "ff_last")} />

          <GrowthCard growthCount={storeGrowth(sameStore, "ff_this", "ff_last")} deGrowthCount={storeDeGrowth(sameStore, "ff_this", "ff_last")} title="SameStore FootFall" mainData={sumFunctionAnyStores(sameStore, "ff_this")} diff={calculateDiff(sameStore, "ff_this", "ff_last")} path="/" percentage={calculateTotalPercentage(sameStore, "ff_this", "ff_last")} />

          {/* ------------------------------------ */}

          <GrowthCard growthCount={storeGrowth(allStore, "gpv_this", "gpv_last")} deGrowthCount={storeDeGrowth(allStore, "gpv_this", "gpv_last")} title="All Store GPV" mainData={sumFunctionAnyStores(allStore, "gpv_this")} diff={calculateDiff(allStore, "gpv_this", "gpv_last")} path="/" percentage={calculateTotalPercentage(allStore, "gpv_this", "gpv_last")} />

          <GrowthCard growthCount={storeGrowth(sameStore, "gpv_this", "gpv_last")} deGrowthCount={storeDeGrowth(sameStore, "gpv_this", "gpv_last")} title="Same Store GPV" mainData={sumFunctionAnyStores(sameStore, "gpv_this")} diff={calculateDiff(sameStore, "gpv_this", "gpv_last")} path="/" percentage={calculateTotalPercentage(sameStore, "gpv_this", "gpv_last")} />

          <GrowthCard growthCount={storeGrowth(allStore, "bs_this", "bs_last")} deGrowthCount={storeDeGrowth(allStore, "bs_this", "bs_last")} title="All Store BS" mainData={BSThisAll} diff={BSThisAll - BSLastAll} path="/" percentage={((BSThisAll / BSLastAll) - 1) * 100} />

          <GrowthCard growthCount={storeGrowth(sameStore, "bs_this", "bs_last")} deGrowthCount={storeDeGrowth(sameStore, "bs_this", "bs_last")} title="Same Store BS" mainData={BSThisSame} diff={BSThisSame - BSLastSame} path="/" percentage={((BSThisSame / BSLastSame) - 1) * 100} />

          {/* ------------------------------------ */}
        </div>
        <StoreLevelTable data={updatedData} />

      </div>
    </main>
  )
}

export default Dashboard