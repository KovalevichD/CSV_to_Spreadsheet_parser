const { configValidateCSV } = require("../../../config");
const validateUrl = require("./validateUrl");

const validateData = (data, rowIndex) => {
  const columnsToSave = configValidateCSV.columnsToSaveGoogleAds;
  const columnsForTakingDataGoogleAds =
    configValidateCSV.columnsForTakingDataGoogleAds;
  const columnsToBeginning = configValidateCSV.columnsAddToBeginningGoogleAds;
  const columnsToEnd = configValidateCSV.columnsAddToEndGoogleAds;
  const isFirstRowCSV = rowIndex === 0;
  const validatedData = [];
  
  if (isFirstRowCSV) {
    validatedData.push(...columnsToBeginning);
  } else {
    const firstFrag = data[columnsForTakingDataGoogleAds["destination"]];
    const secondFrag = data[columnsForTakingDataGoogleAds["hotel_id"]];
    const uniqIdString = `${firstFrag}_${secondFrag}`;

    validatedData.push(uniqIdString);
  }

  for (const prop in columnsToSave) {
    const columnToSave = columnsToSave[prop];

    if (isFirstRowCSV) {
      const titleColumn = data[columnToSave].replace(/^\s+|\s+$/g, "");

      switch (titleColumn) {
        case "origin":
          data[columnToSave] = "Origin ID";
          break;
        case "name":
          data[columnToSave] = "Title";
          break;
        case "thumbnail_image_url":
          data[columnToSave] = "Image URL";
          break;
        case "url":
          data[columnToSave] = "Final URL";
          break;
        case "PackageTypeCode":
          data[columnToSave] = "Category";
          break;
      }

      validatedData.push(data[columnToSave]);
    } else {
      const exitUrl = data[columnsToSave["url"]];
      const imageUrl = data[columnsToSave["thumbnail_image_url"]];
      const validatedExitUrl = validateUrl(exitUrl);
      const validatedImageUrl = validateUrl(imageUrl);

      if (validatedExitUrl && validatedImageUrl)
        validatedData.push(data[columnToSave]);
    }
  }

  if (isFirstRowCSV) {
    validatedData.push(...columnsToEnd);
  } else {
    const latitude = data[columnsForTakingDataGoogleAds["latitude"]];
    const longitude = data[columnsForTakingDataGoogleAds["longitude"]];
    const destinationAddress = `${latitude}, ${longitude}`;

    validatedData.push(destinationAddress);
  }

  return validatedData;
};

module.exports = validateData;