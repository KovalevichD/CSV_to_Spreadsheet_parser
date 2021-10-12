const parseCsv = async (req, res) => {
  const { configGSH } = require("./config");
  const connectToFTP = require("./src/ftp/connectFTP");
  const readDirFTP = require("./src/ftp/readDirFTP");
  const parseCSV = require("./src/ftp/parseCSV");
  const connectSheets = require("./src/sheets/connectSheets");
  const writeDataToSheets = require("./src/sheets/writeData");

  const connectionFTP = await connectToFTP();
  const connection = connectionFTP.connection;
  const sftp = connectionFTP.sftp;
  const file = await readDirFTP(sftp);
  const data = await parseCSV(connection, sftp, file);
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

parseCsv()