const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const connect = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const connectionFTP = await connect.connectToFTP();
  const csv = await readDirFTP(connectionFTP);
  const data = await parseCSV(connectionFTP, csv);
  const sheets = await connectSheets();
  const facebookSheetId = configGSH.spreadsheetId;
  const fileSheetName = "Facebook_BB";

  writeDataToSheets(data, sheets, facebookSheetId, fileSheetName);
};
