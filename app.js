exports.parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const googleSheetId = configGSH.spreadsheetIdGoogle;
  const facebookSheetId = configGSH.spreadsheetIdFacebook;
  const connect = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const connectionFTP = await connect.connectToFTP();
  const datesOfFiles = await readDirFTP(connectionFTP);
  const data = await parseCSV(connectionFTP, datesOfFiles);
  const sheets = await connectSheets();

  writeDataToSheets(data.googleData, sheets, googleSheetId);
  writeDataToSheets(data.facebookData, sheets, facebookSheetId);
};