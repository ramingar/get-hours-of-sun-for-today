const R = require('ramda');

const data = {
    "coord"     : {"lon": -0.13, "lat": 51.51},
    "weather"   : [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
    "base"      : "stations",
    "main"      : {"temp": 285.06, "pressure": 1014, "humidity": 76, "temp_min": 284.15, "temp_max": 286.15},
    "visibility": 10000,
    "wind"      : {"speed": 9.3, "deg": 240, "gust": 15.4},
    "clouds"    : {"all": 75},
    "dt"        : 1511178600,
    "sys"       : {
        "type": 1, "id": 5091, "message": 0.0087, "country": "GB", "sunrise": 1511162879, "sunset": 1511193846
    },
    "id"        : 2643743,
    "name"      : "London",
    "cod"       : 200
};

const transformMinutesToHours   = R.divide(R.__, 60);
const transformSecondsToMinutes = R.divide(R.__, 60);

const sunrise = R.path(['sys', 'sunrise']);
const sunset  = R.path(['sys', 'sunset']);
const extract = R.curry((functions, val) => R.ap([...functions], [val]));

const calculateDiff = val => R.subtract(R.head(val), R.tail(val));

const getDayLightHours = R.pipe(
    extract([sunset, sunrise]),
    calculateDiff,
    transformSecondsToMinutes,
    transformMinutesToHours,
    Math.floor
);

test('extract the daylight hours from this data', () => {
    expect(getDayLightHours(data)).toEqual(8)
});
