import { PiWarningCircleLight } from "react-icons/pi"

interface Props { 
    error:string, 
}

const ErrorText: React.FC<Props> = ({error}) => {
    return (
        <div className='w-full flex justify-start items-center p-6 gap-3 text-xs md:text-base bg-red-500/10 rounded-md  text-rose-600 font-medium border border-dashed border-red-500'>
            <PiWarningCircleLight className="w-6 h-6" />
            <span>
                {error}
            </span>
        </div>
    )
}

export default ErrorText