const validateDataGoogleAds = require("../utils/validate/validateData");
const checkRowSemicolonEmptyCell = require("../utils/validate/checkRowSemicolonEmptyCell");
const checkRowIsUniqueHotel = require("../utils/validate/checkRowOneOption");
const { configFTP } = require("../../config");
const parseCsv = require("papaparse");

const parseSCV = (connection, sftp, fileName) => {
  return new Promise((resolve, reject) => {
    const pathCSV = configFTP.root_directory + fileName;
    const readDataStream = sftp.createReadStream(pathCSV, "utf-8");
    const parseStream = parseCsv.parse(parseCsv.NODE_STREAM_INPUT, {});
    const setUniqueIdOneOption = new Set();
    const setImgUrlOneOption = new Set();
    const data = {};

    let counter = 0;

    data.googleAdsData = [];

    readDataStream.pipe(parseStream);

    console.log("CSV parsing...");

    readDataStream.on("end", () => {
      connection.end();
    });

    parseStream.on("data", async (chunk) => {
      const validatedChunkGoogleAds = validateDataGoogleAds(chunk, counter);
      const isRowWithoutSemicolonEmptyCell = checkRowSemicolonEmptyCell(validatedChunkGoogleAds);
      const isUniqueHotel = checkRowIsUniqueHotel(validatedChunkGoogleAds, setUniqueIdOneOption, setImgUrlOneOption);

      if (isRowWithoutSemicolonEmptyCell && isUniqueHotel) data.googleAdsData.push(validatedChunkGoogleAds);

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
