const { google } = require("googleapis");
const config = require("../../config");

const connectSheets = async () => {
  const client = new google.auth.JWT(
    config.configGSH.client_email,
    null,
    config.configGSH.private_key,
    config.configGSH.scopes
  );

  await client.authorize();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });
  return sheets;
};

module.exports = connectSheets;
