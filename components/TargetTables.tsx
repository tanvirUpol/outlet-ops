
import AccordionTable from '@/components/AccordionTable';
import { overAllData, overAllTotalData } from '@/utility';
import { SiCoveralls } from "react-icons/si";
import { IoPerson } from "react-icons/io5";


const TargetTables = ({ data }) => {

    // console.log(data);
    // console.log(data);
    const overAllDataHeaders = ["Zonal", "Target", "Actual", "Gap", "Achivement%"]
    const overAllDataValues = overAllData(data)

    const overAllTotalDataHeaders = ["Description", "Target", "Actual", "Gap", "Achivement%"]
    const overAllTotalDataValues = [overAllTotalData(data)]
    // console.log(overAllDataValues);


    return (
        <div className='space-y-4'>
            <AccordionTable icon={<SiCoveralls />} title="Overall Target" headers={overAllTotalDataHeaders} data={overAllTotalDataValues} />
            <AccordionTable icon={<IoPerson />} title="Zonal Individual" headers={overAllDataHeaders} data={overAllDataValues} />

        </div>
    )
}

export default TargetTables