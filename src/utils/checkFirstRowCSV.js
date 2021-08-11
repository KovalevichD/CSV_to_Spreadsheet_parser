const checkIsFirstRowCSV = (data, firstThreeColumnNames) => {
  let result = true;

  for (const column of firstThreeColumnNames) {
    const columnName = column[0];
    const columnIndex = column[1];
    const stringWithoutBrakes = data[columnIndex].replace(/^\s+|\s+$/g, "");

    if (stringWithoutBrakes !== columnName) {
      result = false;
      break;
    }
  }

  return result;
};

module.exports = checkIsFirstRowCSV;
