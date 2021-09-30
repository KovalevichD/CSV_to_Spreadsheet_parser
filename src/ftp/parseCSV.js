const getLatestCSVDate = require("../utils/csv/getLatestCSVDate");
const validateDataGoogleAds = require("../utils/validate/validateDataGoogleAds");
const checkRow = require("../utils/validate/checkRowGoogleAds");
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

    let counter = 0;

    data.googleAdsData = [];

    readDataStream.pipe(parseStream);

    console.log("CSV parsing...");

    readDataStream.on("end", () => {
      connect.connection.end();
    });

    parseStream.on("data", async (chunk) => {
      const validatedChunkGoogleAds = validateDataGoogleAds(chunk, counter);
      const isNormalRow = checkRow(validatedChunkGoogleAds);

      if (isNormalRow) data.googleAdsData.push(validatedChunkGoogleAds);

      counter++;
    });

    parseStream.on("finish", () => {
      resolve(data);

      console.log(
        `CSV parsing is finished! Added rows: Google Ads - ${data.googleAdsData.length}`
      );
      console.log(`Initial amount of rows: ${counter}`);
    });
  });
};

module.exports = parseSCV;
