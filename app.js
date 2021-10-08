const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const googleAdsSheetId = configGSH.spreadsheetId;
  const connectToFTP = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const connect = await connectToFTP();
  const connection = connect.connection;
  const sftp = connect.sftp;
  const fileCSV = await readDirFTP(sftp);
  const data = await parseCSV(connection, sftp, fileCSV);
  const sheets = await connectSheets();

  writeDataToSheets(data.googleAdsData, sheets, googleAdsSheetId, 'GoogleAds');
};