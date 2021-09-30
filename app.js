const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const googleAdsSheetId = configGSH.spreadsheetIdGoogleAds;
  const connect = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const sftp = await connect.connectToFTP();
  const connection = connect.connection;
  const datesOfFiles = await readDirFTP(sftp);
  const data = await parseCSV(connection, sftp, datesOfFiles);
  const sheets = await connectSheets();

  writeDataToSheets(data.googleAdsData, sheets, googleAdsSheetId, 'GoogleAds');
};

module.exports = parseCsv;