const removeBadRows = (
  arrayRow,
  setUniqueId,
  setHotelId,
  setImgUrl,
  setImgUrlClone
) => {
  const uniqueId = arrayRow[0];
  const hotelId = arrayRow[3];
  const imageUrl = arrayRow[16];
  let isNormalRow = false;

  if (!setUniqueId.has(uniqueId)) {
    if (!setHotelId.has(hotelId)) {
      if (!setImgUrl.has(imageUrl)) {
        isNormalRow = true;
      } else {
        setImgUrlClone.add(hotelId);
      }

      setImgUrl.add(imageUrl);
    } else {
      if (!setImgUrlClone.has(hotelId)) {
        isNormalRow = true;
      }
    }
  }

  setUniqueId.add(uniqueId);
  setHotelId.add(hotelId);

  return isNormalRow;
};

module.exports = removeBadRows;
