const getLatestCSVDate = (csvList) => {
  const latestDate = new Date(Math.max(...csvList));
  const yyyy = latestDate.getUTCFullYear();
  const mm =
    latestDate.getUTCMonth() < 9
      ? "0" + (latestDate.getUTCMonth() + 1)
      : latestDate.getMonth() + 1;
  const dd =
    latestDate.getUTCDate() < 10
      ? "0" + latestDate.getUTCDate()
      : latestDate.getUTCDate();
  const hh =
    latestDate.getUTCHours() < 10
      ? "0" + latestDate.getUTCHours()
      : latestDate.getUTCHours();

  return yyyy + mm + dd + hh + ".csv";
};

module.exports = getLatestCSVDate;
