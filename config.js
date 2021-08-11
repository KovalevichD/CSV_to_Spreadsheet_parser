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
    spreadsheetId: "id",
    sheetName: "name"
  },
  configValidateCSV: {
    columnsAddToBeginning: ["unique_id", "reporting_label"],
    columnsAddToEnd: ["is_active", "is_default"],
    columnsSave: {
      "neighborhood": 10,
      "base_price": 14,
      "package_price": 15,
      "trip_length_of_stay": 18,
      "thumbnail_image_url": 20,
      "date": 35
    }
  },
};