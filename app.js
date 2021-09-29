const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const connect = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");
  const connectionFTP = await connect.connectToFTP();
  const datesOfFiles = await readDirFTP(connectionFTP);
  const data = await parseCSV(connectionFTP, datesOfFiles);
  const sheets = await connectSheets();
  const settingsAllOptionsFeed = {
    data: data.facebookDataAllOptions, 
    sheetsConnection: sheets,
    sheetId: configGSH.spreadsheetIdAllOptions,
    sheetName: configGSH.sheetNameAllOptions,
    sheetForString: "Facebook All Options"
  }
  const settingsOneOptionFeed = {
    data: data.facebookDataOnOption, 
    sheetsConnection: sheets,
    sheetId: configGSH.spreadsheetIdOneOption,
    sheetName: configGSH.sheetNameOneOption,
    sheetForString: "Facebook One Option"
  }

  writeDataToSheets(settingsAllOptionsFeed);
  writeDataToSheets(settingsOneOptionFeed);
};