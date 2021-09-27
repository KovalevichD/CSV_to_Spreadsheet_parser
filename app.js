const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const googleSheetId = configGSH.spreadsheetIdGoogle;
  const facebookSheetId = configGSH.spreadsheetIdFacebook;
  const connect = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");
  const validateImage = require("./src/utils/validate/validateImage")
  const removeWrongImages = require("./src/utils/validate/removeWrongImages")

  const connectionFTP = await connect.connectToFTP();
  const datesOfFiles = await readDirFTP(connectionFTP);
  const data = await parseCSV(connectionFTP, datesOfFiles);
  const newDATA = await removeWrongImages(data.facebookData, 'facebook')
  const sheets = await connectSheets();

  writeDataToSheets(newDATA, sheets, googleSheetId, 'Google');
  writeDataToSheets(data.facebookData, sheets, facebookSheetId, 'Facebook');
};