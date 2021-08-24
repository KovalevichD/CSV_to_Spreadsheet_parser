const validateUrl = (link) => {
  if (link) {
    const url_regex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[ |\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi;
    const url = link.trim();
    return (
      url.indexOf("http") === 0 ||
      (url.split(" ").length < 3 && url_regex.test(url))
    );
  }
  return false;
};

module.exports = validateUrl;