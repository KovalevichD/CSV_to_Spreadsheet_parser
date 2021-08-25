const { configValidateCSV } = require("../../../config");
const checkFirstRowCSV = require("../csv/checkFirstRowCSV");
const validateUrl = require("./validateUrl");

const validateGoogle = (data) => {
  const columnsToSave = configValidateCSV.columnsToSaveGoogle;
  const columnsToBeginning = configValidateCSV.columnsAddToBeginningGoogle;
  const columnsToEnd = configValidateCSV.columnsAddToEndGoogle;
  const firstThreeColumnNames = Object.entries(columnsToSave).slice(0, 3);
  const isFirstRowCSV = checkFirstRowCSV(data, firstThreeColumnNames);
  const validatedData = [];
  const isDefault = "FALSE";
  let isActive = "TRUE";

  if (isFirstRowCSV) {
    validatedData.push(...columnsToBeginning);
  } else {
    const firstFrag = data[columnsToSave["origin"]];
    const secondFrag = data[columnsToSave["hotel_id"]];
    const thirdFrag = data[columnsToSave["trip_length_of_stay"]];
    const uniqIdString = `${firstFrag}_${secondFrag}_${thirdFrag}`;

    validatedData.push(uniqIdString, uniqIdString);
  }

  for (const prop in columnsToSave) {
    const columnToSave = columnsToSave[prop];

    validatedData.push(data[columnToSave]);
  }

  if (isFirstRowCSV) {
    validatedData.push(...columnsToEnd);
  } else {
    const exitUrl = data[columnsToSave["url"]];
    const isUrl = validateUrl(exitUrl);

    if (!isUrl) isActive = "FALSE";

    validatedData.push(isActive, isDefault);
  }

  return validatedData;
};

module.exports = validateGoogle;
