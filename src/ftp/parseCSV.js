const getLatestCSVDate = require("../utils/csv/getLatestCSVDate");
const validateDataGoogle = require("../utils/validate/validateDataGoogle");
const validateDataFacebook = require("../utils/validate/validateDataFacebook");
const connect = require("./connectFTP");
const { configFTP } = require("../../config");
const parseCsv = require("papaparse");
const checkRowFacebook = require("../utils/validate/checkRowFacebook");
const checkRowGoogle = require("../utils/validate/checkRowGoogle");

const parseSCV = (sftp, dates) => {
  return new Promise((resolve, reject) => {
    const actualCSV = getLatestCSVDate(dates);
    const pathCSV = configFTP.root_directory + configFTP.csv_name + actualCSV;
    const readDataStream = sftp.createReadStream(pathCSV, "utf-8");
    const parseStream = parseCsv.parse(parseCsv.NODE_STREAM_INPUT, {});
    const data = {};
    const setUniqueIdGoogle = new Set();
    const setImgUrlGoogle = new Set();

    const setUniqueIdFacebook = new Set();
    const setHotelIdFacebook = new Set();
    const setImgUrlFacebook = new Set();
    const setImgUrlCloneFacebook = new Set();

    data.googleData = [];
    data.facebookData = [];

    readDataStream.pipe(parseStream);

    console.log("CSV parsing...");

    readDataStream.on("end", () => {
      connect.connection.end();
    });

    parseStream.on("data", async (chunk) => {
      const validatedChunkGoogle = validateDataGoogle(chunk);
      const validatedChunkFacebook = validateDataFacebook(chunk);
      const isNormalRowGoogle = checkRowGoogle(
        validatedChunkGoogle,
        setUniqueIdGoogle,
        setImgUrlGoogle
      );
      const isNormalRowFacebook = checkRowFacebook(
        validatedChunkFacebook,
        setUniqueIdFacebook,
        setHotelIdFacebook,
        setImgUrlFacebook,
        setImgUrlCloneFacebook
      );

      if (isNormalRowFacebook) data.facebookData.push(validatedChunkFacebook);
    });

    parseStream.on("finish", () => {
      resolve(data);
      console.log(
        `CSV parsing is finished! Added rows: Google - ${data.googleData.length}, Facebook - ${data.facebookData.length}`
      );
    });
  });
};

module.exports = parseSCV;
