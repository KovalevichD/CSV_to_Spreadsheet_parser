const { configFTP } = require("../../config");

const readDirFTP = (sftp) => {
  return new Promise((resolve, reject) => {
    sftp.readdir(configFTP.root_directory, (err, list) => {
      if (err) throw err;

      console.log("Reading directory");

      const necessaryCsvArr = [];

      list.forEach(file => {
        const fileName = file.filename;
        
        if (fileName.indexOf(configFTP.csv_name) >= 0) {
          necessaryCsvArr.push(file.filename)
        }
      })

      resolve(necessaryCsvArr[necessaryCsvArr.length - 1]);
    });
  });
};

module.exports = readDirFTP;
