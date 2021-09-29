const writeDataToSheets = async (settings) => {
  const {data, sheetsConnection, sheetId, sheetName, sheetForString} = settings;
  const values = data;
  const lastCellTitle = data[0].length;

  const styleOptions = {
    spreadsheetId: sheetId,
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
    spreadsheetId: sheetId,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  };

  const clearOptions = {
    spreadsheetId: sheetId,
    range: sheetName,
  };

  console.log(`Filling sheet for ${sheetForString}...`);
  await sheetsConnection.spreadsheets.values.clear(clearOptions);

  await sheetsConnection.spreadsheets.batchUpdate(styleOptions);

  await sheetsConnection.spreadsheets.values.append(appendOptions);
  console.log(`The sheet for ${sheetForString} is filled with ${data.length} lines`);
};

module.exports = writeDataToSheets;
