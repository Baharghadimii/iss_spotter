const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  const datetime = new Date(0);
  datetime.setUTCSeconds(passTimes.risetime);
  const duration = passTimes.duration;
  console.log(`Next pass at ${datetime} for ${duration} seconds!`);
});
