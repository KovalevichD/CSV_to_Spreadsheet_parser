const Client = require("ssh2").Client;
const connection = new Client();
const { configFTP } = require("../../config");

const connectToFTP = () => {
  return new Promise((resolve, reject) => {
    connection.connect({
      host: configFTP.host,
      port: configFTP.port,
      username: configFTP.user_name,
      password: configFTP.password,
    });

    connection.on("error", console.error.bind(console, "connection error:"));
    connection.on("end", () => {
      console.log("FTP connection is closed");
    });
    connection.on("ready", () => {
      console.log("Connected to FTP");

      connection.sftp((err, sftp) => {
        if (err) throw err;

        resolve({ sftp, connection });
      });
    });
  });
};

module.exports = connectToFTP;
