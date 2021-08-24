const { configValidateCSV } = require("../../../config");
const checkFirstRowCSV = require("../csv/checkFirstRowCSV");
const validateUrl = require("./validateUrl");

const validateFacebook = (data) => {
  const columnsToSave = configValidateCSV.columnsToSave;
  const columnsToBeginning = configValidateCSV.columnsAddToBeginningFacebook;
  const columnsToEnd = configValidateCSV.columnsAddToEndFacebook;
  const firstThreeColumnNames = Object.entries(columnsToSave).slice(0, 3);
  const isFirstRowCSV = checkFirstRowCSV(data, firstThreeColumnNames);
  const validatedData = [];
  let visibility = "published";

  if (isFirstRowCSV) {
    validatedData.push(...columnsToBeginning);
  } else {
    const firstFrag = data[columnsToSave["origin"]];
    const secondFrag = data[columnsToSave["hotel_id"]];
    const thirdFrag = data[columnsToSave["trip_length_of_stay"]];
    const uniqIdString = `${firstFrag}_${secondFrag}_${thirdFrag}`;

    validatedData.push(uniqIdString);
  }

  for (const prop in columnsToSave) {
    if (isFirstRowCSV) {
      const columnToSave = columnsToSave[prop];
      const titleColumn = data[columnToSave].replace(/^\s+|\s+$/g, "");

      switch (titleColumn) {
        case "origin":
          data[columnToSave] = "origin_airport";
          break;
        case "hotel_id":
          data[columnToSave] = "item_group_id";
          break;
        case "destination":
          data[columnToSave] = "destination_airport";
          break;
        case "trip_length_of_stay":
          data[columnToSave] = "length_of_stay";
          break;
        case "package_price":
          data[columnToSave] = "price";
          break;
        case "thumbnail_image_url":
          data[columnToSave] = "image[0].url";
          break;
        case "address_country":
          data[columnToSave] = "address.country";
          break;
      }

      validatedData.push(data[columnToSave]);
    } else {
      const columnToSave = columnsToSave[prop];

      validatedData.push(data[columnToSave]);
    }
  }

  if (isFirstRowCSV) {
    validatedData.push(...columnsToEnd);
  } else {
    const exitUrl = data[columnsToSave["url"]];
    const isUrl = validateUrl(exitUrl);

    if (!isUrl) visibility = "rejected";

    validatedData.push(visibility);
  }

  return validatedData;
};

module.exports = validateFacebook;
