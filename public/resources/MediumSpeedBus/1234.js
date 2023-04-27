const { Map } = require("../CanMap/canMap");
const { mediumSpeed } = require("../VariableMaps/MediumSpeedVar");
const id = Map;

// This is pretty much self explanatory, but I'll explain it anyway.
// The first 3 lines are just setting up the variables and such.
// The next 3 lines are getting the time from the message.
// The next 3 lines are formatting the time.
// The last 3 lines are setting the time in the variable map.

function ms1234(msg) {
  const strId = msg.id;
  const arr = [...msg.data];
  arr[5] &= ~64;
  arr[5] &= ~128;
  arr[6] &= ~128;
  arr[7] &= ~128;
  var hour = arr[5];
  var minute = arr[6];
  var second = arr[7];
  mediumSpeed.time.hour = hour < 10 ? "0" + arr[5] : arr[5];
  mediumSpeed.time.minute = minute < 10 ? "0" + arr[6] : arr[6];
  mediumSpeed.time.second = second < 10 ? "0" + arr[7] : arr[7];
}

module.exports = ms1234;