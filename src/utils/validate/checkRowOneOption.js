const removeBadRows = (arrayRow, setUniqueId, setImgUrl) => {
  const uniqueId = arrayRow[0];
  const imageUrl = arrayRow[16];
  let isNormalRow = false;

  if (!setUniqueId.has(uniqueId)) {
    if (!setImgUrl.has(imageUrl)) isNormalRow = true;
    setImgUrl.add(imageUrl);
  }

  setUniqueId.add(uniqueId);

  return isNormalRow;
};

module.exports = removeBadRows;
