const { configValidateCSV } = require("../../config");
const checkFirstRowCSV = require("./checkFirstRowCSV");

const validateData = (data) => {
  const columnsToSave = configValidateCSV.columnsSave;
  const columnsToBeginning = configValidateCSV.columnsAddToBeginning;
  const columnsToEnd = configValidateCSV.columnsAddToEnd;
  const firstThreeColumnNames = Object.entries(columnsToSave).slice(0, 3);
  const isFirstRowCSV = checkFirstRowCSV(data, firstThreeColumnNames);
  const validatedData = [];

  if (isFirstRowCSV) {
    validatedData.push(...columnsToBeginning);
  } else {
    const idFirstFrag = data[columnsToSave["neighborhood"]];
    const idSecondFrag = data[columnsToSave["package_price"]];
    const labelFirstFrag = data[columnsToSave["neighborhood"]];
    const labelSecondFrag = data[columnsToSave["date"]];
    const un_id = `id_${idFirstFrag}_${idSecondFrag}`;
    const rep_label = `rep_label_${labelFirstFrag}_${labelSecondFrag}`;

    validatedData.push(un_id, rep_label);
  }

  for (const prop in columnsToSave) {
    const columnToSave = columnsToSave[prop];

    validatedData.push(data[columnToSave]);
  }

  if (isFirstRowCSV) {
    validatedData.push(...columnsToEnd);
  } else {
    validatedData.push("TRUE", "FALSE");
  }

  return validatedData;
};

module.exports = validateData;
