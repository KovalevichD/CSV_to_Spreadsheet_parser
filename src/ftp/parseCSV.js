const getLatestCSVDate = require("../utils/csv/getLatestCSVDate");
const validateDataGoogle = require("../utils/validate/validateDataGoogle");
const validateDataFacebook = require("../utils/validate/validateDataFacebook");
const connect = require("./connectFTP");
const { configFTP } = require("../../config");
const parseCsv = require("papaparse");

const parseSCV = (sftp, dates) => {
  return new Promise((resolve, reject) => {
    const actualCSV = getLatestCSVDate(dates);
    const pathCSV = configFTP.root_directory + configFTP.csv_name + actualCSV;
    const readDataStream = sftp.createReadStream(pathCSV, "utf-8");
    const parseStream = parseCsv.parse(parseCsv.NODE_STREAM_INPUT, {});
    const data = {};

    data.googleData = [];
    data.facebookData = [];

    readDataStream.pipe(parseStream);

    console.log("CSV parsing...");

    readDataStream.on("end", () => {
      connect.connection.end();
    });

    parseStream.on("data", (chunk) => {
      const validatedChunkGoogle = validateDataGoogle(chunk);
      const validatedChunkFacebook = validateDataFacebook(chunk);

      data.googleData.push(validatedChunkGoogle);
      data.facebookData.push(validatedChunkFacebook);
    });

    parseStream.on("finish", () => {
      resolve(data);

      console.log("CSV parsing is finished");
    });
  });
};

module.exports = parseSCV;
