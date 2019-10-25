const request = require('request-promise-native');

const fetchMyIP = function () {
  return request(`https://api.ipify.org?format=json`);
};
const fetchCoordsByIP = function (ip) {
  return request(`https://ipvigilante.com/json/${ip}`);
};
const fetchISSFlyOverTimes = function (geo) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${geo.latitude}&lon=${geo.longitude}`;
  return request(url);
};
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};