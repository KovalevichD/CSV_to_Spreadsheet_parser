const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const connect = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const sftp = await connect.connectToFTP();
  const connection = connect.connection;
  const csv = await readDirFTP(sftp);
  const data = await parseCSV(connection, sftp, csv);
  const sheets = await connectSheets();
  const facebookSheetId = configGSH.spreadsheetId;
  const fileSheetName = "Facebook_BB";

  writeDataToSheets(data, sheets, facebookSheetId, fileSheetName);
};
parseCsv()