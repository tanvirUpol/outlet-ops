import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const DropDownFilter = ({ selectedValue, setSelectedValue, options, title, screen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (option) => {
        const isSelected = selectedValue.includes(option);

        if (isSelected) {
            setSelectedValue(selectedValue.filter((item) => item !== option));
        } else {
            setSelectedValue([...selectedValue, option]);
        }
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && screen === "big" && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);



    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="border-b-2 border-indigo-500 text-slate-800 font-semibold py-2  items-center text-left  w-full flex justify-between mb-3"
                onClick={toggleDropdown}
            >
                <p>{title}</p>
                {isOpen &&
                    <IoMdArrowDropup />
                }

                {!isOpen &&
                    <IoMdArrowDropdown />
                }
            </button>
            {!isOpen && <hr className="h-px my-8 bg-gray-200 border-0"></hr>}
            {isOpen && (
                <div className={`z-10 mt-2 bg-white border border-gray-200  rounded-md shadow-sm ${screen === "big" ? 'absolute' : 'static'} `}>
                    <ul className="p-3 w-44">
                        {options.map((item, index) =>
                            <li key={index} className="" >
                                <label className="flex items-center justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={selectedValue.includes(item)}
                                        onChange={() => handleOptionChange(item)}
                                    />
                                    <span className="ml-2">{item}</span>
                                </label>
                            </li>)}


                        {/* Add more checkbox options as needed */}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default DropDownFilter