module.exports = {
  configFTP: {
    host: "23.236.48.59",
    port: 22,
    user_name: "name",
    password: "password",
    root_directory: "/your/dir/",
    csv_name: "csv_name",
  },
  configGSH: {
    client_email: "email",
    private_key: "key",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    spreadsheetIdGoogle: "id",
    spreadsheetIdFacebook: "id",
    sheetName: "name",
  },
  configValidateCSV: {
    columnsAddToBeginningGoogle: ["unique_id", "reporting_label"],
    columnsAddToEndGoogle: ["is_active", "is_default"],
    columnsAddToBeginningFacebook: ["hotel.id"],
    columnsAddToEndFacebook: ["visibility"],
    columnsToSaveGoogle: {
      column_name_0: 0,
      column_name_5: 5,
      column_name_11: 11
    },
    columnsToSaveFacebook: {
      column_name_0: 0,
      column_name_5: 5,
      column_name_11: 11
    }
  },
};
