export const DataFormater = (data) => {
  const dataObjArr = [];
  const dataProductsArr = [];
  const dataImagesArr = [];
  for (let i = 0; i < data.length; i++) {
    const dataObj = {
      id: data[i].id,
      poInput: data[i].poInput,
      companyName: data[i].companyName,
      purchaseOrder: data[i].purchaseOrder,
      entryDate: data[i].entryDate,
      qualityCheck: data[i].qualityCheck,
      userNotes: data[i].userNotes,
    };
    const imageObj = {
      id: data[i].id,
      images: data[i].images,
    };
    for (let j = 0; j < data.products[i].length; j++) {
      const productObj = {
        id: data[i].id,
        products: data[i].products.prod,
      };
    }

    dataObjArr.push(dataObj);
    dataProductsArr.push(productObj);
    dataImagesArr.push(imageObj);
  }
  console.log(dataObjArr);
  return (dataObjArr, dataImagesArr, dataProductsArr);
};
