const getAllCSVDates = (csvList, nameCSV) => {
  const dates = [];

  csvList.forEach((item) => {
    if (item.filename.includes(nameCSV)) {
      const date = item.filename.slice(-14, -4),
        hours = date.slice(-2),
        day = date.slice(-4, -2),
        month = date.slice(-6, -4),
        year = date.slice(-10, -6);
      dates.push(Date.UTC(year, month - 1, day, hours, 0, 0));
    }
  });

  return dates;
};

module.exports = getAllCSVDates;
