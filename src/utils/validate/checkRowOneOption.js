const checkRowIfUniqueHotelAndOrigin = (arrayRow, setHotelAndOrigin, index) => {
  let isNormalRow = true;

  if (index === 0) return isNormalRow;

  const uniqueId = arrayRow[0];
  const uniqueIdArray = uniqueId.split("_");
  const uniqueHotelAndOrigin = uniqueIdArray[1] + uniqueIdArray[2]

  if (setHotelAndOrigin.has(uniqueHotelAndOrigin)) isNormalRow = false;

  setHotelAndOrigin.add(uniqueHotelAndOrigin);

  return isNormalRow;
};

module.exports = checkRowIfUniqueHotelAndOrigin;

