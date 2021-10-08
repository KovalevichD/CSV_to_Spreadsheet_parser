const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const googleAdsSheetId = configGSH.spreadsheetId;
  const connectToFTP = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const connectToFTP = await connectToFTP();
  const sftp = connectToFTP.sftp;
  const connection = connectToFTP.connection;
  const c = await readDirFTP(sftp);
  const data = await parseCSV(connection, sftp, sftp);
  const sheets = await connectSheets();

  writeDataToSheets(data.googleAdsData, sheets, googleAdsSheetId, 'GoogleAds');
};