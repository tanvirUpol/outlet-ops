export  const sumFunctionAnyStores = (data: any, field: string) => {
    const summedData = data.reduce(
      (sum: number, obj: any) => sum + parseFloat(obj[field]),
      0
    );
    return summedData;
  }


  
  export const calculateDiff = (data: any, thisField: string, lastField: string) => {
    return sumFunctionAnyStores(data, thisField) - sumFunctionAnyStores(data, lastField)
  }


  



  export const calculateTotalPercentage = (data: any, thisField: string, lastField: string) => {
    return (((sumFunctionAnyStores(data, thisField) - sumFunctionAnyStores(data, lastField)) / sumFunctionAnyStores(data, lastField)) * 100);
  };

  export const calculateNormalPercentage = ( thisField: string, lastField: string) => {
    if(!parseFloat(lastField)) return 0
    return (( parseFloat(thisField) - parseFloat(lastField)) / parseFloat(lastField)) * 100;
  };



  export const storeGrowth = (data: any, fieldThis: string, fieldLast: string) => {
    return (data.filter((obj: any) => parseFloat(obj[fieldThis]) >= parseFloat(obj[fieldLast]))).length;
  }


  export const storeDeGrowth = (data: any, fieldThis: string, fieldLast: string) => {
    return (data.filter((obj: any) => parseFloat(obj[fieldThis]) < parseFloat(obj[fieldLast]))).length;
  }


  export const numFor = Intl.NumberFormat("en-US");