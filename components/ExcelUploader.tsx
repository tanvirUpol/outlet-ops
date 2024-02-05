"use client"
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ErrorText from './ErrorText';
import ExampleTableDownload from './ExampleTableDownload';


// Function to extract month from date in the format 'YYYY-MM-DD'
function getMonthFromDate(dateString: string): string {
    const [day, month, year] = dateString.split('-').map(Number);

    // Check if the parsed values are valid
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        throw new Error('Invalid date format');
    }

    const date = new Date(year, month - 1, day); // Month is zero-based, so subtract 1

    const parsedMonth = date.getMonth() + 1; // Month is zero-based, so add 1
    const parsedYear = date.getFullYear();
    return `${parsedYear}-${parsedMonth}`;
}

// Function to extract month from date in the format 'YYYY-MM-DD'
function getDateFormat(dateString: string): string {
    console.log(dateString);
    const date = new Date(dateString);
    const day = date.getDate(); 
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getDateFormatExcel(excelDate: number): string {
    const date = new Date((excelDate - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1900, 0, 1));
    const day = date.getDate() - 1;
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getMonthFormatExcel(excelDate: number): string {
    const date = new Date((excelDate - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1900, 0, 1));
    const day = date.getDate() - 1;
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();
    return `${year}-${month}`;
}

const ExcelUploader = () => {
    interface formFormat {
        selectedFileName: string;
        selectedFileFormat: string | null;
        selectedHeaders: string[];
        selectedPath: string;

    }
    const [loading, setLoading] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const [selectedOpt, setSelectedOpt] = useState<formFormat>({
        selectedFileName: "",
        selectedFileFormat: null,
        selectedHeaders: [],
        selectedPath: "",
    });
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string>("")

    const FileFormat = [
        {
            name: "Key Store",
            headers: ["outlet_code", "outlet_status", "outlet_name", "outlet_format", "outlet_division", "outlet_zone"],
            api_path: "api/keyStore"

        },
        {
            name: "Store Level",
            headers: ["gp_percent", "outlet_code", "outlet_name", "zonal", "sales_contribution", "this_net_profit", "profitable", "ff_this", "ff_last", "bs_this", "bs_last", "gpv_this", "gpv_last", "sales_this", "sales_last", "month", "day"],
            api_path: "api/storeLevel"
        },
        {
            name: "Category Level",
            headers: ["outlet_code", "outlet_name", "zonal", "master_category", "cat_1", "cat_3", "ff_this", "ff_last", "sales_this", "sales_last", "format_sales_gr", "bs_this", "bs_last", "gpv_this", "gpv_last", "month", "day", "format_bs_gr", "format_ff_gr", "format_gpv_gr"],
            api_path: "api/catLevel"
        },
        {
            name: "Target Data",
            headers: ["zonal", "sales_t", "sales_a", "gpv_t", "gpv_a", "profit_t", "profit_a", "churn_t", "churn_a", "reactivation_t", "reactivation_a", "ff_t", "ff_a"],
            api_path: "api/target"
        },
        {
            name: "Same Store Data",
            headers: ["code"],
            api_path: "api/sameStore"
        },
        {
            name: "Key Articles",
            headers: ["article_code", "article_name"],
            api_path: "api/keyArticle"
        },
        {
            name: "PNP Achivement",
            headers: ["outlet_division", "outlet_format", "outlet_name"],
            api_path: "api/achivement"
        },
        {
            name: "Invoice Data",
            headers: ["date"],
            api_path: "api/invoice"
        },
        // {
        //     name: "Bench Mark Stores",
        //     headers: ["outlet_code", "outlet_name"],
        //     api_path: "api/benchStores"
        // }
    ]



    const checkFormat = (actual_format: string[], given_format: string[]) => {
        // console.log(actual_format, given_format);
        return actual_format.every(item => given_format.includes(item.toLowerCase()));
    }




    const handleFileChange = async (e: any) => {
        // console.log(selectedOpt.selectedFileFormat);

        if (!selectedOpt.selectedFileFormat) {
            setError("Please Select a file type first")
            const file: any = document.querySelector(".file");
            file.value = "";
            setData([]);
            return null
        } else {
            setError("")
            const file = e.target.files[0];

            console.log(file);


            if (file && selectedOpt.selectedFileName === "PNP Achivement") {
                setLoading(true);

                try {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        const binaryData = e.target?.result;

                        try {
                            const workbook = XLSX.read(binaryData, { type: 'binary' });

                            const jsonDataArray: any[] = [];

                            workbook.SheetNames.forEach((sheetName) => {
                                const sheet = workbook.Sheets[sheetName];
                                let jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
                                    defval: 'not available', // Set default value for empty cells
                                });

                                console.log(jsonData);

                                // Convert all values to string
                                jsonData = jsonData.map((row) => {
                                    const stringRow: { [key: string]: string } = {};
                                    Object.keys(row).forEach((key) => {
                                        stringRow[key.toLowerCase()] = row[key].toString();
                                    });
                                    return stringRow;
                                });

                                // Convert headers to lowercase
                                if (jsonData.length > 0) {
                                    jsonData = jsonData.map((row) => {
                                        const lowerCaseRow: { [key: string]: any } = {};
                                        Object.keys(row).forEach((key) => {
                                            lowerCaseRow[key.toLowerCase().trim()] = row[key];
                                        });
                                        return lowerCaseRow;
                                    });
                                }

                                const firstObject = jsonData[0];

                                const lowercaseKeys: { [key: string]: any } = Object.keys(firstObject).reduce((acc: any, key) => {
                                    acc[key.toLowerCase()] = firstObject[key];
                                    return acc;
                                }, {});

                                if (!checkFormat(selectedOpt.selectedHeaders, Object.keys(lowercaseKeys))) {
                                    setError("File headers not correct. Please use the example table")
                                    throw new Error;
                                }

                                const transformedData = jsonData.map((item) => {

                                    const outlet_code = item.outlet_name.substring(0, 4);
                                    const achievementTarget = Object.keys(item)
                                        .filter((key) => key !== "outlet_division" && key !== "outlet_format" && key !== "outlet_name")
                                        .map((date) => ({
                                            date: getDateFormat(date),
                                            target: item[date],
                                            // month: getMonthFromDate(date),
                                        }));

                                    // Calculate total_target by summing up the target values
                                    const total_target = achievementTarget.reduce((total, target) => total + parseFloat(target.target) || 0, 0);

                                    // Extract month from the first date in the achievementTarget array
                                    const month = achievementTarget.length > 0 ? getMonthFromDate(achievementTarget[0].date) : '';

                                    return {
                                        outlet_division: item.outlet_division,
                                        outlet_format: item.outlet_format,
                                        outlet_name: item.outlet_name,
                                        outlet_code,
                                        total_target,
                                        cat_3: sheetName,
                                        achievement_target: achievementTarget,
                                        month
                                    };
                                });

                                jsonDataArray.push(...transformedData);
                            });

                            console.log(jsonDataArray);
                            setData(jsonDataArray);
                            setFileName(file.name);
                        } catch (error) {
                            console.error('Error reading the Excel file:', error);
                            setLoading(false);
                            const fileInput: any = document.querySelector(".file");
                            fileInput.value = "";
                            setData([]);
                        } finally {
                            setLoading(false);
                        }
                    };

                    reader.readAsBinaryString(file);
                } catch (error) {
                    console.error('Error reading the Excel file:', error);
                    setLoading(false);
                    const fileInput: any = document.querySelector(".file");
                    fileInput.value = "";
                    setData([]);
                }
            }


            // every other files
            if (file && selectedOpt.selectedFileName !== "PNP Achivement") {
                setLoading(true);

                try {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        const binaryData = e.target?.result;

                        try {
                            const workbook = XLSX.read(binaryData, { type: 'binary' });
                            const sheetName = workbook.SheetNames[0];
                            const sheet = workbook.Sheets[sheetName];
                            let jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
                                defval: 'not available', // Set default value for empty cells
                            });


                            // if(selectedOpt.selectedFileFormat === "Store Level"){
                            //     console.log("Hello");
                            // }


                            // Convert all values to string
                            jsonData = jsonData.map((row) => {
                                const stringRow: { [key: string]: string } = {};
                                Object.keys(row).forEach((key) => {
                                    stringRow[key.toLowerCase()] = row[key].toString();
                                });
                                return stringRow;
                            });

                            // Convert headers to lowercase
                            if (jsonData.length > 0) {
                                jsonData = jsonData.map((row) => {
                                    const lowerCaseRow: { [key: string]: any } = {};
                                    Object.keys(row).forEach((key) => {
                                        lowerCaseRow[key.toLowerCase().trim()] = row[key];
                                    });
                                    return lowerCaseRow;
                                });
                            }

                            // console.log(Object.keys(jsonData[0]));

                            const firstObject = jsonData[0];

                            const lowercaseKeys: { [key: string]: any } = Object.keys(firstObject).reduce((acc: any, key) => {
                                acc[key.toLowerCase()] = firstObject[key];
                                return acc;
                            }, {});

                            console.log(Object.keys(lowercaseKeys));

                            if (!checkFormat(selectedOpt.selectedHeaders, Object.keys(lowercaseKeys))) {
                                setError("File headers not correct. Please use the example table")
                                throw new Error
                            }

                            if (selectedOpt.selectedFileName === "Invoice Data") {
                                console.log(jsonData);
                                // List of desired Level3 values
                                const desiredLevel3 = ['beef', 'bird', 'chicken', 'egg', 'fish', 'fruits', 'mutton', 'vegetable'];

                                const groupedData = jsonData.reduce((result, entry) => {
                                    const outletCode = entry.outletcode;
                                    const level3 = entry.level3.toLowerCase();
                                    const nsi = parseFloat(entry.nsi.replace(/^'/, ''));
                                    const date = entry.date;
                                    console.log(outletCode, level3, nsi, date);
                                    if (desiredLevel3.includes(level3)) {
                                        const existingEntry = result.find(item => item.outlet_code === outletCode && item.cat_3 === level3);

                                        // If entry doesn't exist, create a new one
                                        if (!existingEntry) {
                                            result.push({
                                                outlet_code: outletCode,
                                                cat_3: level3,
                                                total_sales: nsi,
                                                date: getDateFormatExcel(date),
                                                month: getMonthFormatExcel(date)
                                            });
                                        } else {
                                            // If entry exists, update total sales
                                            existingEntry.total_sales += nsi;
                                        }
                                    }
                                    // Find existing entry in result array


                                    return result;
                                }, []);

                                console.log(groupedData);

                                setData(groupedData)
                            } else {
                                setData(jsonData);
                            }

                            setFileName(file.name);
                        } catch (error) {
                            console.error('Error reading the Excel file:', error);
                            setLoading(false);
                            const file: any = document.querySelector(".file");
                            file.value = "";
                            setData([]);
                        } finally {
                            setLoading(false);
                        }
                    };

                    reader.readAsBinaryString(file);
                } catch (error) {
                    console.error('Error reading the Excel file:', error);
                    setLoading(false);
                    const file: any = document.querySelector(".file");
                    file.value = "";
                    setData([]);
                }
            }
        }



    };

    const removeFile = (e: any) => {
        e.preventDefault()
        const file: any = document.querySelector(".file");
        file.value = "";
        setData([]);

    };

    const handleFileFormatChange = (selectedFormat: string) => {
        const selectedFormatObject = FileFormat.find(format => format.name === selectedFormat);
        setError("")
        const file: any = document.querySelector(".file");
        file.value = "";
        setData([]);
        if (selectedFormatObject) {
            setSelectedOpt({
                selectedFileName: selectedFormatObject.name,
                selectedFileFormat: selectedFormat,
                selectedHeaders: selectedFormatObject.headers,
                selectedPath: selectedFormatObject.api_path,
            });
        }
    }

    const handleFileSubmit = async () => {

        if (data.length > 0) {
            console.log(data);
            setLoading(true)
            // http://localhost:4000/api/keyArticle
            try {
                const res = await fetch(selectedOpt.selectedPath, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const json = await res.json()
                console.log(json);

                if (res.ok) {
                    console.log("submitted!");
                    toast.success('Successfully submitted!')
                    setData([])
                    setLoading(false)
                    const file: any = document.querySelector(".file");
                    file.value = "";

                } else {
                    console.log("submission failed");
                    toast.error('File Did not submit!')
                    setLoading(false)
                    setData([])
                    const file: any = document.querySelector(".file");
                    file.value = "";
                    //   setError(json.message)
                }

            } catch (error) {
                console.log("submission failed with:", error);
                const file: any = document.querySelector(".file");
                file.value = "";
                toast.error('File Did not submit!')
                setLoading(false)

            }

            console.log(data);
        }
        else {
            toast.error('Please select a file')
        }
    }



    return (
        <div className="flex flex-col items-end gap-2 mt-2 p-3 ">
            <Select onValueChange={(e) => handleFileFormatChange(e)}>
                <SelectTrigger className="w-[150px] md:w-[180px] mb-2" >
                    <SelectValue placeholder="Select a File" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup  >
                        <SelectLabel>File Types:</SelectLabel>
                        {FileFormat.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                        ))}

                        {/* <SelectItem value="Key Store">Key Store</SelectItem> */}

                    </SelectGroup>
                </SelectContent>
            </Select>
            <label
                className="group cursor-pointer w-full flex flex-col justify-center items-center gap-5 bg-[#E1F0FF]/40 py-12 rounded-md border-2 bor border-dashed border-gray-500 hover:border-teal-500"
                htmlFor="upload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-500 group-hover:text-teal-500 md:w-12 md:h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>

                {data.length === 0 && !loading && (
                    <span className="text-gray-700 group-hover:text-teal-500 text-md text-center">
                        Click to upload excel (.xlsx)
                    </span>
                )}

                {data.length === 0 && loading && (
                    <span className="text-gray-700  und text-lg font-medium">
                        Loading...
                    </span>
                )}

                {data.length > 0 && (
                    <>
                        <span className="px-2 text-sm">File Name: {fileName}</span>
                        <button
                            className="bg-[#2c4772] hover:bg-[#3c5e96] text-white py-1 px-3 rounded"
                            onClick={removeFile}
                        >
                            remove
                        </button>
                    </>
                )}
            </label>
            <input
                type="file"
                accept=".xlsx, .xls, .xlsb"
                id='upload'
                onChange={handleFileChange}

                disabled={loading}
                className="py-2 px-4 border rounded file hidden"
            />
            <p className='text-left w-full text-gray-400 text-sm'>Supported format: XLS , XLSX , XLSB</p>

            <div className="my-4 w-full">
                <button
                    onClick={handleFileSubmit}
                    className="bg-[#446EB1] hover:bg-[#3c5e96] text-white w-full py-2 px-4 rounded font-medium"
                >
                    {loading ? "Loading" : "Submit"}
                </button>
            </div>



            <ExampleTableDownload fileName={selectedOpt.selectedFileFormat} data={selectedOpt.selectedHeaders} />

            {
                error &&
                <ErrorText error={error} />
            }

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default ExcelUploader


