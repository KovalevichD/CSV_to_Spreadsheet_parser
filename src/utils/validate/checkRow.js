const { configValidateCSV } = require("../../../config");

const removeBadRows = (arrayRow) => {
  const uniqueId = arrayRow[0];
  const titleCell = arrayRow[4];
  const isEmptyCell = titleCell.length === 0;
  const isSemicolonInCell = uniqueId.indexOf(";") >= 0;
  let isNormalRow = true;

  if (configValidateCSV.leaveValuesWithSemicolon) {
    if (isEmptyCell) isNormalRow = false;
  } else {
    if (isSemicolonInCell || isEmptyCell) isNormalRow = false;
  }

  return isNormalRow;
};

module.exports = removeBadRows;
