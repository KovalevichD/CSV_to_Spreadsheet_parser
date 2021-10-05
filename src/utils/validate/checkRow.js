const removeBadRows = (arrayRow, setUniqueId, setImgUrl) => {
  const uniqueId = arrayRow[0];
  const imageUrl = arrayRow[12];
  const titleCell = arrayRow[2];
  const isEmptyCell = titleCell.length === 0;
  const isSemicolonInCell = uniqueId.indexOf(";") >= 0;
  let isNormalRow = false;

  if (isSemicolonInCell || isEmptyCell) return isNormalRow;

  if (!setUniqueId.has(uniqueId)) {
    if (!setImgUrl.has(imageUrl)) isNormalRow = true;
    setImgUrl.add(imageUrl);
  }

  setUniqueId.add(uniqueId);

  return isNormalRow;
};

module.exports = removeBadRows;
