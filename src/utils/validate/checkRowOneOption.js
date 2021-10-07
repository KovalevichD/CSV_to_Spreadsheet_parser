const isUniqueHotel = (arrayRow, setUniqueId, setImgUrl) => {
  const uniqueId = arrayRow[0];
  const imageUrl = arrayRow[12];
  let isNormalRow = true;

  if (setUniqueId.has(uniqueId)) {
    isNormalRow = false;

    if (setImgUrl.has(imageUrl)) isNormalRow = false;

    setImgUrl.add(imageUrl);
  }

  setUniqueId.add(uniqueId);

  return isNormalRow;
};

module.exports = isUniqueHotel;
