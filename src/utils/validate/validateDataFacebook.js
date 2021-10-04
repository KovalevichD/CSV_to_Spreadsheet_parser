const { configValidateCSV } = require("../../../config");
const checkFirstRowCSV = require("../csv/checkFirstRowCSV");
const validateUrl = require("./validateUrl");

const validateFacebook = (data) => {
  const columnsToSave = configValidateCSV.columnsToSave;
  const columnsToBeginning = configValidateCSV.columnsAddToBeginning;
  const columnsToEnd = configValidateCSV.columnsAddToEnd;
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
    const columnToSave = columnsToSave[prop];

    if (isFirstRowCSV) {
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
        case "neighborhood":
          data[columnToSave] = "neighborhood[0]";
          break;
        case "address_addr1":
          data[columnToSave] = "address.addr1";
          break;
        case "address_city":
          data[columnToSave] = "address.city";
          break;
        case "address_region":
          data[columnToSave] = "address.region";
          break;
        case "address_country":
          data[columnToSave] = "address.country";
          break;
        case "NativeDescription":
          data[columnToSave] = "native_description";
          break;
      }

      validatedData.push(data[columnToSave]);
    } else {
      let basePrice = data[columnsToSave["base_price"]];
      let packagePrice = data[columnsToSave["package_price"]];
      const validatedBasePrice = basePrice.split("$")[1] + " USD";
      const validatedPackagePrice = packagePrice.split("$")[1] + " USD";

      switch (prop) {
        case "base_price":
          data[columnToSave] = validatedBasePrice;
          break;
        case "package_price":
          data[columnToSave] = validatedPackagePrice;
          break;
      }

      validatedData.push(data[columnToSave]);
    }
  }

  if (isFirstRowCSV) {
    validatedData.push(...columnsToEnd);
  } else {
    const exitUrl = data[columnsToSave["url"]];
    const isUrl = validateUrl(exitUrl);
    const lengthOfStay = data[columnsToSave["trip_length_of_stay"]];
    const description = lengthOfStay + " Nights with Air";
    
    if (!isUrl) visibility = "rejected";

    validatedData.push(description, visibility);
  }

  return validatedData;
};

module.exports = validateFacebook;
