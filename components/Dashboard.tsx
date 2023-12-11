import Download from "@/components/Download";
import Filter from "@/components/Filter";
import GrowthCard from "@/components/GrowthCard";
import SearchBar from "@/components/SearchBar";

import { MdDashboard } from "react-icons/md";

const Dashboard = () => {
  return (
    <main className="flex">
      <div className="flex-1"> {/* Add ml-16 for the margin */}
        {/* Your main content goes here */}
        <div className="flex items-center gap-2 mb-4 text-gray-800 ">
          <MdDashboard className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="w-full flex flex-col md:flex-row  items-start md:items-center justify-between ">
          <SearchBar />
          <div className="flex items-center justify-between gap-4 w-full md:w-auto">
            <Download />
            <Filter />
          </div>
        </div>
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-4 w-full gap-3 " >
          <GrowthCard title="SALES" mainData={211232111} diff={32220} path="/" percentage={33}  />
          <GrowthCard title="POS GPV" mainData={211111} diff={500} path="/" percentage={33}  />
          <GrowthCard title="Sales" mainData={2114311} diff={500} path="/" percentage={33}  />
          <GrowthCard title="Sales" mainData={211111} diff={500} path="/" percentage={33}  />

          {/* ------------------------------------ */}
          <GrowthCard title="SALES" mainData={211232111} diff={32220} path="/" percentage={33}  />
          <GrowthCard title="POS GPV" mainData={211111} diff={500} path="/" percentage={33}  />
          <GrowthCard title="Sales" mainData={2114311} diff={500} path="/" percentage={33}  />
          <GrowthCard title="Sales" mainData={211111} diff={500} path="/" percentage={33}  />

            {/* ------------------------------------ */}
            <GrowthCard title="SALES" mainData={211232111} diff={32220} path="/" percentage={33}  />
          <GrowthCard title="POS GPV" mainData={211111} diff={500} path="/" percentage={33}  />
          <GrowthCard title="Sales" mainData={2114311} diff={500} path="/" percentage={33}  />
          <GrowthCard title="Sales" mainData={211111} diff={500} path="/" percentage={33}  />
        </div>
        {/* Add more content as needed */}
        
      </div>
    </main>
  )
}

export default Dashboard