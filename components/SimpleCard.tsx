import Link from "next/link"
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
    title: string,
    mainData: number,
    path: string
}

const SimpleCard: React.FC<Props> = ({ title, mainData, path }) => {
    const numFor = Intl.NumberFormat("en-US");

    return (
        <Link
            href={path}
            className="flex justify-between items-center  w-full rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100"
        >
            <div>
                <h5 className="mb-1 text-xs font-bold tracking-tight text-gray-600 lg:text-base">
                    {title}
                </h5>
                <p className={`mb-1 text-base font-semibold text-gray-950 lg:text-xl`}>
                    {numFor.format(Math.round(mainData))}
                </p>
            </div>

        </Link>
    )
}

export default SimpleCard