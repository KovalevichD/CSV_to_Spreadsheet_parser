const getLatestCSVDate = require("../utils/csv/getLatestCSVDate");
const validateDataFacebook = require("../utils/validate/validateDataAllOptions");
const connect = require("./connectFTP");
const { configFTP } = require("../../config");
const parseCsv = require("papaparse");
const checkRowAllOptions = require("../utils/validate/checkRowAllOptions");
const checkRowOneOption = require("../utils/validate/checkRowOneOption");

const parseSCV = (sftp, dates) => {
  return new Promise((resolve, reject) => {
    const actualCSV = getLatestCSVDate(dates);
    const pathCSV = configFTP.root_directory + configFTP.csv_name + actualCSV;
    const readDataStream = sftp.createReadStream(pathCSV, "utf-8");
    const parseStream = parseCsv.parse(parseCsv.NODE_STREAM_INPUT, {});
    const data = {};
    const setUniqueIdOneOption = new Set();
    const setImgUrlOneOption = new Set();

    const setUniqueIdAllOptions = new Set();
    const setHotelIdAllOptions = new Set();
    const setImgUrlAllOptions = new Set();
    const setImgUrlCloneAllOptions = new Set();

    let counter = 0;

    data.facebookDataAllOptions = [];
    data.facebookDataOnOption = [];

    readDataStream.pipe(parseStream);

    console.log("CSV parsing...");

    readDataStream.on("end", () => {
      connect.connection.end();
    });

    parseStream.on("data", async (chunk) => {
      const validatedChunkFacebook = validateDataFacebook(chunk, counter);
      const isNormalRowOneOption = checkRowOneOption(
        validatedChunkFacebook,
        setUniqueIdOneOption,
        setImgUrlOneOption
      );
      const isNormalRowAllOptions = checkRowAllOptions(
        validatedChunkFacebook,
        setUniqueIdAllOptions,
        setHotelIdAllOptions,
        setImgUrlAllOptions,
        setImgUrlCloneAllOptions
      );

      if (isNormalRowAllOptions) data.facebookDataAllOptions.push(validatedChunkFacebook);
      if (isNormalRowOneOption) data.facebookDataOnOption.push(validatedChunkFacebook);
      counter++;
    });

    parseStream.on("finish", () => {
      resolve(data);
      
      console.log(
        `CSV parsing is finished! Added rows: Facebook all options - ${data.facebookDataAllOptions.length}, Facebook one option - ${data.facebookDataOnOption.length}`
      );
      console.log(`Initial amount of rows: ${counter}`);
    });
  });
};

module.exports = parseSCV;