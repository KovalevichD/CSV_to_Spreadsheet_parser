const validateData = require("../utils/validate/validateData");
const connect = require("./connectFTP");
const { configFTP } = require("../../config");
const parseCsv = require("papaparse");
const checkRow = require("../utils/validate/checkRow");

const parseSCV = (sftp, fileName) => {
  return new Promise((resolve, reject) => {
    const pathCSV = configFTP.root_directory + fileName;
    const readDataStream = sftp.createReadStream(pathCSV, "utf-8");
    const parseStream = parseCsv.parse(parseCsv.NODE_STREAM_INPUT, {});
    const data = [];
    const setUniqueId = new Set();
    const setImgUrl = new Set();
    let counter = 0;

    readDataStream.pipe(parseStream);

    console.log("CSV parsing...");

    readDataStream.on("end", () => {
      connect.connection.end();
    });
    
    parseStream.on("data", async (chunk) => {
      const validatedChunk = validateData(chunk, counter);
      const isNormalRow = checkRow(
        validatedChunk,
        setUniqueId,
        setImgUrl
      );
      
      if (isNormalRow) data.push(validatedChunk);

      counter++;
    });

    parseStream.on("finish", () => {
      resolve(data);

      console.log(
        `CSV parsing is finished! Added rows: Facebook - ${data.length}`
      );
      console.log(`Initial amount of rows: ${counter}`);
    });
  });
};

module.exports = parseSCV;
