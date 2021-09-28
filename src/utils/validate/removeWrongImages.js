const validateImage = require("./validateImage");

const removeImages = async (arr, marketplace) => {
  const newData = [];
  let len = arr.length;

  newData.push(arr[0]);
  await (async function loop() {
    for (let i = 1; i < arr.length; i++) {
      console.log(len--);
      const row = arr[i];
      let imgUrl = marketplace === "google" ? row[12] : row[16];

      const result = await validateImage(imgUrl).catch((err) =>
        console.log('Validate image ERR', err)
      );

      try {
        if (result.width > 600 && result.height >= 300) {
          newData.push(row);
          console.log(result);
        }
      } catch (e) {
        console.log('Image dimensions ERR', e);
      }
    }
  })();

  return newData;
};

module.exports = removeImages;
