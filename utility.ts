export const sumFunctionAnyStores = (data: any, field: string) => {
  const summedData = data.reduce(
    (sum: number, obj: any) => sum + (parseFloat(obj[field]) ? parseFloat(obj[field]) : 0), 0
  );
  return summedData;
}



export const calculateDiff = (data: any, thisField: string, lastField: string) => {
  return sumFunctionAnyStores(data, thisField) - sumFunctionAnyStores(data, lastField)
}



export const calculateTotalPercentage = (data: any, thisField: string, lastField: string) => {
  return (((sumFunctionAnyStores(data, thisField) - sumFunctionAnyStores(data, lastField)) / sumFunctionAnyStores(data, lastField)) * 100);
};

export const calculateNormalPercentage = (thisField: string, lastField: string) => {
  if (!parseFloat(lastField)) return 0
  return ((parseFloat(thisField) - parseFloat(lastField)) / parseFloat(lastField)) * 100;
};



export const storeGrowth = (data: any, fieldThis: string, fieldLast: string) => {
  return (data.filter((obj: any) => parseFloat(obj[fieldThis]) >= parseFloat(obj[fieldLast]))).length;
}


export const storeDeGrowth = (data: any, fieldThis: string, fieldLast: string) => {
  return (data.filter((obj: any) => parseFloat(obj[fieldThis]) < parseFloat(obj[fieldLast]))).length;
}


export const numFor = Intl.NumberFormat("en-US");


export const addGrowth = (data: any[]) => {
  const updatedData = data.map((item: any) => {

    const total_sales = sumFunctionAnyStores(data, "sales_this")
    // console.log(data[0]);
    const bench_total_sales = sumFunctionAnyStores(data, "bench_sales_this")
    // if(item.cat_3 === "DIGESTIVES"){
    //   console.log(item.sales_this, item.bench_sales_this);
    // } 
    // console.log(total_sales,bench_total_sales);
    return {

      ...item,
      sales_contribution: parseFloat(item.sales_this) / parseFloat(total_sales) * 100,
      bench_sales_contribution: parseFloat(item.bench_sales_this) / parseFloat(bench_total_sales) * 100,
      sales_growth: calculateNormalPercentage(item.sales_this, item.sales_last),
      gpv_growth: calculateNormalPercentage(item.gpv_this, item.gpv_last),
      ff_growth: calculateNormalPercentage(item.ff_this, item.ff_last),
      bs_growth: calculateNormalPercentage(item.bs_this, item.bs_last),
      sales_diff: parseFloat(item.sales_this) - parseFloat(item.sales_last),
      gpv_diff: parseFloat(item.gpv_this) - parseFloat(item.gpv_last),
      bs_diff: parseFloat(item.bs_this) - parseFloat(item.bs_last),
      ff_diff: parseFloat(item.ff_this) - parseFloat(item.ff_last),
      gp_percent: parseFloat(item.sales_this) === 0 ? 0 : (parseFloat(item.gpv_this) / parseFloat(item.sales_this)) * 100,
      bench_gp_percent: parseFloat(item.bench_sales_this) === 0 ? 0 : (parseFloat(item.bench_gpv_this) / parseFloat(item.bench_sales_this)) * 100
    }
  });

  return updatedData
}


export const overAllData = (data: any[]) => {
  // console.log(data);
  const updatedData = data.map((item: any) => {
    return {
      Target:numFor.format(parseFloat(item.profit_t)),
      Actual: numFor.format(parseFloat(item.profit_a)),
      Gap: numFor.format(parseFloat(item.profit_a) - parseFloat(item.profit_t)),
      "Achivement%": ((parseFloat(item.profit_a) / parseFloat(item.profit_t)) * 100).toFixed(2) + "%",
      Zonal: item.zonal
    }

  });
  return updatedData
}

export const overAllTotalData = (data: any[]) => {
  // console.log(data);
  
    return {
      Target:numFor.format(sumFunctionAnyStores(data , "profit_t")),
      Actual: numFor.format(sumFunctionAnyStores(data ,"profit_a")),
      Gap: numFor.format(sumFunctionAnyStores(data , "profit_a") - sumFunctionAnyStores(data , "profit_t")),
      "Achivement%": ((sumFunctionAnyStores(data , "profit_a") / sumFunctionAnyStores(data , "profit_t")) * 100).toFixed(2) + "%",
      Description: "Total"
    }

 
  
}
