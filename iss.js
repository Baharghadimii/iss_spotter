const request = require('request');

const nextISSTimesForMyLocation = function (callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
      if (error) {
        callback(error);
        return;
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
        return;
      }
      const geo = JSON.parse(body).data;
      const url = `http://api.open-notify.org/iss-pass.json?lat=${geo.latitude}&lon=${geo.longitude}`;
      request(url, (error, response, body) => {
        if (error) {
          callback(error);
          return;
        }
        if (response.statusCode !== 200) {
          callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
          return;
        }
        const data = JSON.parse(body);
        callback(error, data);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};