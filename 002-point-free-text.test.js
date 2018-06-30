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

const city     = R.path(['name']);
const forecast = R.pipe(
    R.path(['weather']),
    R.head(),
    R.path(['description'])
);

const extract = R.curry((functions, val) => R.ap([...functions], [val]));

const getForecast = R.pipe(
    extract([city, forecast]),
    R.zip(['Today in', 'you can expect', '.']),
    R.map(R.join(' ')),
    R.join(' '),
    R.concat(R.__, '.')
);


test('get the forecast thanks to a point-free function', () => {
    expect(getForecast(data)).toEqual('Today in London you can expect broken clouds.')
});
