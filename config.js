module.exports = {
  configFTP: {
    host: "",
    port: 22,
    user_name: "name",
    password: "pass",
    root_directory: "dir",
    csv_name: "name",
  },
  configGSH: {
    client_email: "email",
    private_key: "key",
    scopes: ["scope"],
    spreadsheetIdGoogle: "id",
    spreadsheetIdFacebook: "id",
    sheetName: "name"
  },
  configValidateCSV: {
    columnsAddToBeginningGoogle: ["unique_id", "reporting_label"],
    columnsAddToEndGoogle: ["is_active", "is_default"],
    columnsAddToBeginningFacebook: ["hotel_id"],
    columnsAddToEndFacebook: ["description","visibility"],
    columnsToSaveGoogle: {
      "origin": 0,
      "destination": 1,
      "hotel_id": 2,
      "name": 3,
      "address_region": 7,
      "address_country": 8,
      "base_price": 14,
      "package_price": 15,
      "description": 16,
      "trip_length_of_stay": 18,
      "thumbnail_image_url": 20,
      "url": 21
    },
    columnsToSaveFacebook: {
      "origin": 0,
      "destination": 1,
      "hotel_id": 2,
      "name": 3,
      "brand": 4,
      "address_addr1": 5,
      "address_city": 6,
      "address_region": 7,
      "address_country": 8,
      "neighborhood": 10,
      "latitude": 11,
      "longitude": 12,
      "base_price": 14,
      "package_price": 15,
      "trip_length_of_stay": 18,
      "thumbnail_image_url": 20,
      "url": 21,
      "NativeDescription": 28
    }
  },
};
