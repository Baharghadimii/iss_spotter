const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP().then((body) => {
  const ip = JSON.parse(body).ip;
  return fetchCoordsByIP(ip);
}).then((body) => {
  const coords = {};
  coords['latitude'] = JSON.parse(body)['data'].latitude;
  coords['longitude'] = JSON.parse(body)['data'].longitude;
  return fetchISSFlyOverTimes(coords);
}).then((body => {
  const bodyObj = JSON.parse(body);
  for (const pass of bodyObj.response) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
})).catch((error) => {
  console.log("It didn't work: ", error.message);
});





