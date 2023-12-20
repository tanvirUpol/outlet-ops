// import Link from "next/link"
// import { IoMdArrowDropup } from "react-icons/io";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { IoStorefrontSharp } from "react-icons/io5";
import { IoStorefront } from "react-icons/io5";
interface Props {
  title: string,
  mainData: number,
  diff: number,
  percentage: number,
  path: string,
  growthCount: number,
  deGrowthCount: number
}

const GrowthCard: React.FC<Props> = ({ title, mainData, diff, percentage, path, growthCount, deGrowthCount }) => {
  const numFor = Intl.NumberFormat("en-US");

  return (
    <div
      className="w-full rounded-lg border border-gray-200 bg-white p-4 lg:p-5 shadow hover:bg-gray-100"
    >
      
        <h5 className="mb-1 text-xs font-bold tracking-tight text-gray-600 lg:text-base">
          {title}
        </h5>
        <div className="flex justify-between items-end w-full">
          <div className="stats">
            <p className={`mt-2 mb-1 text-sm font-semibold text-gray-950 lg:text-xl`}>
              {numFor.format(Math.round(mainData))}
            </p>
            <span
              className={`flex gap-1 text-xs font-medium ${diff < 0 ? "text-rose-500" : "text-green-600"
                }`}
            >
              <p>{numFor.format(Math.round(diff))}</p>|<p>{percentage.toFixed(2)}</p> <span>%</span>
            </span>
          </div>
          <div className="text-xs xl:text-sm flex flex-col xl:flex-row items-start justify-center font-medium gap-2 xl:gap-4">
            <div className="flex justify-start gap-1 items-center text-teal-500">
              <IoStorefront className="" />
              <span>
                {growthCount}
              </span>
            </div>
            <div className="flex justify-center gap-1 items-center text-rose-600">
              <IoStorefront className="" />
              <span>
                {deGrowthCount}
              </span>
            </div>

          </div>
        </div>
      

    </div>
  )
}

export default GrowthCard