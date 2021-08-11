const { configFTP } = require("../../config");
const getAllCSVDates = require("../utils/getAllCSVDates");

const readDirFTP = (sftp) => {
  return new Promise((resolve, reject) => {
    sftp.readdir(configFTP.root_directory, (err, list) => {
      if (err) throw err;

      console.log("Reading directory");

      const dates = getAllCSVDates(list, configFTP.csv_name);

      resolve(dates);
    });
  });
};

module.exports = readDirFTP;
