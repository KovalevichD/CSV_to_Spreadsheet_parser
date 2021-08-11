const config = require("../../config");

const writeDataToSheets = async (data, sheets) => {
  const values = data;
  const lastCellTitle = data[0].length;
  
  const styleOptions = {
    spreadsheetId: config.configGSH.spreadsheetId,
    resource: {
      requests: [
        {
          updateCells: {
            range: {
              sheetId: 0,
            },
            fields:
              "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
          },
        },
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: lastCellTitle,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 0.22,
                  green: 0.46,
                  blue: 0.11,
                },
                horizontalAlignment: "CENTER",
                textFormat: {
                  foregroundColor: {
                    red: 1,
                    green: 1,
                    blue: 1,
                  },
                  fontSize: 11,
                  bold: true,
                },
              },
            },
            fields:
              "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
          },
        },
      ],
    },
  };

  const appendOptions = {
    spreadsheetId: config.configGSH.spreadsheetId,
    range: config.configGSH.sheetName,
    valueInputOption: "RAW",
    resource: { values },
  };

  const clearOptions = {
    spreadsheetId: config.configGSH.spreadsheetId,
    range: config.configGSH.sheetName,
  };

  console.log("Filling Sheet...");
  await sheets.spreadsheets.values.clear(clearOptions);

  await sheets.spreadsheets.batchUpdate(styleOptions);

  await sheets.spreadsheets.values.append(appendOptions);
  console.log("Sheet filled");
};

module.exports = writeDataToSheets;
