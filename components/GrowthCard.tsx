import Link from "next/link"
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
interface Props { 
    title:string, 
    mainData:number, 
    diff:number, 
    percentage:number, 
    path:string 
}

const GrowthCard: React.FC<Props> = ({ title, mainData, diff, percentage, path }) => {
    const numFor = Intl.NumberFormat("en-US");

    return (
        <Link
        href={path}
        className="mx-1 flex justify-between items-center  w-full rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100"
      >
        <div>

        <h5 className="mb-1 text-xs font-bold tracking-tight text-gray-600 lg:text-base">
          {title}
        </h5>
        <p className={`mb-1 text-base font-semibold text-gray-950 lg:text-xl`}>
          {numFor.format(Math.round(mainData))}
        </p>
        {
          <span
            className={`flex gap-1 text-xs font-semibold ${
              diff < 0 ? "text-rose-500" : "text-green-600"
            }`}
          >
            <p>{numFor.format(diff)}</p>|<p>{percentage}</p> <span>%</span>
          </span>
        }
        </div>
        <div className="text-xs sm:text-sm space-y-4">
          <div className="flex justify-center gap-1 items-center text-green-500">
           <IoMdArrowDropup className="w-5 h-5" />
            <span>
              321
            </span>
          </div>
          <div className="flex justify-center gap-1 items-center text-rose-500">
           <IoMdArrowDropdown className="w-5 h-5" />
            <span>
              124
            </span>
          </div>
      
        </div>
      </Link>
    )
}

export default GrowthCard