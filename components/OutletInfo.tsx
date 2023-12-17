import { BiSolidStore } from "react-icons/bi"
import CatDataTables from "./CatDataTables";
interface Props {
  outletData: Array<any>
  benchOutletData: Array<any>
}

const OutletInfo: React.FC<Props> = ({ outletData = [], benchOutletData = [] }) => {
  // console.log(outletData[2]);


  interface OutletItem {
    [key: string]: string | number; // Adjust this based on the actual types of your data properties
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



  const benchOutletDataMap = new Map(benchOutletData.map(item => [`${item.cat_3}_${item.cat_1}`, item]));

  // console.log(benchOutletDataMap);

  // --------------------------------------------------

  // Map over outletData and add the additional fields from benchOutletData
  const mergedData = outletData.map(item => {
    const benchData = benchOutletDataMap.get(`${item.cat_3}_${item.cat_1}`);

    if (benchData) {
      // Spread the fields from benchData into item
      return {
        ...item,
        bench_sales_this: benchData.sales_this,
        bench_sales_last: benchData.sales_last,
        bench_gpv_this: benchData.gpv_this,
        bench_gpv_last: benchData.gpv_last,
        bench_ff_this: benchData.ff_this,
        bench_ff_last: benchData.ff_last,
        bench_bs_this: benchData.bs_last,
        bench_bs_last: benchData.bs_last,
        // bench_cat_3: benchData.cat_3,
        // Add other fields as needed
      };
    }

    // If no match is found, return the original item
    return item;
  });


  // console.log(mergedData[0]);


  // --------------------------------------------------

  const masterCategoryAggregated = aggregateData("master_category", mergedData);
  const cat1Aggregated = aggregateData("cat_1", outletData);


  // console.log(masterCategoryAggregated[0]);





  return (
    <div className="flex-1 p-4">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <BiSolidStore className="w-6 h-6" />
        <h1 className="text-sm md:text-xl font-bold">{outletData[0]?.outlet_name} - {outletData[0]?.outlet_format}</h1>
        {/* <h1 className="text-sm md:text-xl font-bold">{benchOutletData[0].outlet_name} - {benchOutletData[0].outlet_format}</h1> */}
      </div>
      <CatDataTables masterCategoryData={masterCategoryAggregated} cat1Data={cat1Aggregated} data={mergedData} />
      {/* Add more content as needed */}
    </div>
  )
}

export default OutletInfo