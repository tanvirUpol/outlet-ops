import { BiSolidStore } from "react-icons/bi"
import CatDataTable from "./CatDataTable";

interface Props {
    outletData: Array<any>
  }

const OutletInfo: React.FC<Props> = ({ outletData }) => {
    // console.log(outletData[2]);


    interface OutletItem {
        [key: string]:  string | number; // Adjust this based on the actual types of your data properties
      }
      
      const aggregateData = (category: string, outletData: OutletItem[] | undefined): OutletItem[] => {
        const aggregatedData: { [key: string]: OutletItem } = {};
      
        outletData?.forEach((item) => {
          const categoryValue = item[category] as string;
          if (!aggregatedData[categoryValue]) {
            aggregatedData[categoryValue] = { ...item };
          } else {
            // Sum the corresponding values for each category excluding 'cat_1', 'cat_3', 'master_category', and 'zonal'
            for (const key in item) {
              if (
                key !== category &&
                key !== "cat_1" &&
                key !== "cat_3" &&
                key !== "master_category" &&
                key !== "zonal" &&
                key !== "format" &&
                key !== "outlet_code" &&
                key !== "outlet_name" &&
                key !== "format_sales_gr" &&
                key !== "format_ff_gr" &&
                key !== "format_bs_gr" &&
                key !== "format_gpv_gr" &&
                key !== "month" &&
                key !== "day" &&
                key !== "outlet_division" &&
                key !== "outlet_zone" &&
                key !== "outlet_status" &&
                key !== "outlet_format" &&
                key !== "_id"
              ) {
                aggregatedData[categoryValue][key] = (parseFloat(aggregatedData[categoryValue][key] as string) || 0) + (parseFloat(item[key] as string) || 0);
              }
            }
          }
        });
      
        return Object.values(aggregatedData);
      };


      const masterCategoryAggregated = aggregateData("master_category",outletData);
      const cat1Aggregated = aggregateData("cat_1",outletData);
        // const filteredMasterCategoryData = masterCategoryAggregated?.map((item) => {
        // const { cat_1, cat_3, ...rest } = item;
        // return { ...rest };
        // });

        // console.log(filteredMasterCategoryData[2]);

  return (
    <div className="flex-1 p-4">
    <div className="flex items-center gap-2 mb-4 text-gray-800">
        <BiSolidStore className="w-6 h-6" />
        <h1 className="text-xl font-bold">{outletData[0].outlet_name} - {outletData[0].outlet_format}</h1>
    </div>
    <CatDataTable masterCategoryData={masterCategoryAggregated} cat1Data={cat1Aggregated} data={outletData}/>
    {/* Add more content as needed */}
</div>
  )
}

export default OutletInfo