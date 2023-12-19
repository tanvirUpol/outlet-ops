import { RiMapPinLine } from "react-icons/ri";

const page = () => {
    return (
        <div className="flex-1 p-4 "> {/* Add ml-16 for the margin */}
            {/* Your main content goes here */}
            <div className="flex items-center gap-2 mb-4 text-gray-800">
                <RiMapPinLine className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Map</h1>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, dui a
                bibendum congue, lectus nulla facilisis mauris, eu tincidunt quam velit vel
                odio.
            </p>
            {/* Add more content as needed */}
        </div>
    )
}

export default page