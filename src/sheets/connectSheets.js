const { google } = require("googleapis");
const { configGSH } = require("../../config");

const connectSheets = async () => {
  const client = new google.auth.JWT(
    configGSH.client_email,
    null,
    configGSH.private_key,
    configGSH.scopes
  );

  await client.authorize();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });
  return sheets;
};

module.exports = connectSheets;
