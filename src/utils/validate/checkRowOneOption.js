const checkRowIfUniqueHotel = (arrayRow, setUniqueId, setImgUrl, index) => {
  let isNormalRow = true;

  if (index === 0) return isNormalRow;

  const uniqueId = arrayRow[0];
  const imageUrl = arrayRow[12];

  if (setUniqueId.has(uniqueId)) {
    isNormalRow = false;

    if (setImgUrl.has(imageUrl)) isNormalRow = false;

    setImgUrl.add(imageUrl);
  }

  setUniqueId.add(uniqueId);

  return isNormalRow;
};

module.exports = checkRowIfUniqueHotel;
