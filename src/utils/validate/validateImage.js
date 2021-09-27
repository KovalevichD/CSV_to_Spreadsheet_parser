const validateUrl = require("./validateUrl");
const axios = require("axios");

const validatedImage = async (url) => {
  if (!validateUrl(url)) {
    return { Error: "Wrong url!" };
  }

  const response = await axios({
    method: "get",
    url: url,
    responseType: "arraybuffer",
    insecureHTTPParser: true,
    headers: {
      "User-Agent": "Agent",
      Cookie: "Cookie",
    },
  });

  const determineImageInfo = (data) => {
    var bytear = Array.from(data);

    var format;
    var result;

    var byte2hex = function (data) {
      return data
        .map(function (e) {
          return (e < 0 ? e + 256 : e).toString(16);
        })
        .map(function (e) {
          return e.length === 1 ? "0" + e : e;
        });
    };
    var getFormat = function () {
      var f = byte2hex(bytear.slice(0, 8)).join("");
      format =
        f.slice(0, 16) === "89504e470d0a1a0a"
          ? "png"
          : f.slice(0, 4) === "ffd8"
          ? "jpg"
          : f.slice(0, 6) === "474946"
          ? "gif"
          : f.slice(0, 4) === "424d"
          ? "bmp"
          : "Cannot retrieve image size. Now, it can retrieve image size from png, jpg, gif and bmp.";
    };

    getFormat();

    var getInfBMP = function () {
      return {
        identification: "BMP",
        width: byte2num(bytear.slice(18, 22), true),
        height: byte2num(bytear.slice(22, 26), true),
        filesize: bytear.length,
      };
    };

    var getInfGIF = function () {
      return {
        identification: "GIF",
        width: byte2num(bytear.slice(6, 8), true),
        height: byte2num(bytear.slice(8, 10), true),
        filesize: bytear.length,
      };
    };

    var getInfPNG = function () {
      return {
        identification: "PNG",
        width: byte2num(bytear.slice(16, 20), false),
        height: byte2num(bytear.slice(20, 24), false),
        filesize: bytear.length,
      };
    };

    var getInfJPG = function () {
      var i, ma;
      i = 0;
      while (i < bytear.length) {
        i += 1;
        if (byte2hexNum(bytear[i]) === "ff") {
          i += 1;
          ma = byte2hexNum(bytear[i]);
          if (ma === "c0" || ma === "c1" || ma === "c2") {
            break;
          } else {
            i += hex2num(byte2hex(bytear.slice(i + 1, i + 3)));
          }
        }
      }
      return {
        identification: "JPG",
        width: hex2num(byte2hex(bytear.slice(i + 6, i + 8))),
        height: hex2num(byte2hex(bytear.slice(i + 4, i + 6))),
        filesize: bytear.length,
      };
    };

    var byte2hexNum = function (data) {
      var conv = (data < 0 ? data + 256 : data).toString(16);
      return conv.length === 1 ? "0" + conv : conv;
    };

    var byte2hex = function (data) {
      return data
        .map(function (e) {
          return (e < 0 ? e + 256 : e).toString(16);
        })
        .map(function (e) {
          return e.length === 1 ? "0" + e : e;
        });
    };

    var byte2num = function (data, byteorder) {
      var conv;
      if (byteorder) {
        conv = data.reduceRight(function (ar, e) {
          var temp;
          temp = (e < 0 ? e + 256 : e).toString(16);
          if (temp.length === 1) {
            temp = "0" + temp;
          }
          ar.push(temp);
          return ar;
        }, []);
      } else {
        conv = byte2hex(data);
      }
      return hex2num(conv);
    };

    var hex2num = function (data) {
      return parseInt(data.join(""), 16);
    };

    switch (format) {
      case "bmp":
        result = getInfBMP();
        break;
      case "gif":
        result = getInfGIF();
        break;
      case "png":
        result = getInfPNG();
        break;
      case "jpg":
        result = getInfJPG();
        break;
      default:
        result = {
          Error: format,
        };
    }
    return result;
  };

  return determineImageInfo(response.data);
};

module.exports = validatedImage;
