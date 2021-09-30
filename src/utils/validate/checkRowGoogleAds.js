const { configValidateCSV } = require("../../../config");

const checkRow = (row) => {
  const idCell = row[0];
  const titleCell = row[2];
  const isEmptyCell = titleCell.length === 0;
  const isSemicolonInCell = idCell.indexOf(";") >= 0;
  let isNormalRow = true;

  if (configValidateCSV.leaveValuesWithSemicolon) {
    if (isEmptyCell) isNormalRow = false;
  } else {
    if (isSemicolonInCell || isEmptyCell) isNormalRow = false;
  }

  return isNormalRow;
};

module.exports = checkRow;
