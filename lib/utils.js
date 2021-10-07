const LOCATIONIQ_URL = 'https://us1.locationiq.com/v1/search.php?key=' + process.env.LOCATIONIQ_KEY;
const WEATHERBIT_URL = 'https://api.weatherbit.io/v2.0/forecast/daily?key=' + process.env.WEATHERBIT_KEY;
const YELP_URL = 'https://api.yelp.com/v3/businesses/search?';
const TRAIL_URL = 'https://prescriptiontrails.org/api/filter/?by=coord&';

function getLocationIQURL(queryString) {
  return LOCATIONIQ_URL + '&q=' + queryString + '&format=' + 'json';
}

function getWeatherBitURL(lat, lon) {
  return WEATHERBIT_URL + '&lat=' + lat + '&lon=' + lon + '&days=7';
}

function getYelpURL(lat, lon) {
  return YELP_URL + 'latitude=' + lat + '&longitude=' + lon;
}

function getTrailURL(lat, lon) {
  return TRAIL_URL + 'lat=' + lat + '&lng=' + lon + '&offset=0&count=6';
}

function formatLocationResponse(apiData) {
  const city = apiData[0];
  return {
    formatted_query: city.display_name,
    latitude: city.lat,
    longitude: city.lon
  };
}

function formatWeatherResponse(apiData) {
  return apiData.map(day => {
    return {
      forecast: day.weather.description,
      time: getTimeString(day.datetime)
    };
  });
}

function formatYelpResponse(apiData) {
  return apiData.map(business => {
    return {
      name: business.name,
      image_url: business.image_url,
      price: business.price,
      rating: business.rating,
      url: business.url
    };
  });
}

function formatTrailResponse(apiData) {
  return apiData.map(trail => {
    const [date, time] = getTrailDateTime(trail);
    return {
      name: trail.name,
      location: trail.city,
      length: trail.distance,
      stars: trail.rating,
      star_votes: trail.ratings,
      summary: trail.desc.replace(/%20/g, ' '),
      trail_url: trail.url,
      conditions: trail.surface,
      condition_date: date,
      condition_time: time,
    };
  });
}

function getTimeString(weatherBitTime) {
  let date = new Date(weatherBitTime);
  //why did i do this :( needs UTCString so test don't fail in github ci
  //substring grabs just the date portion
  return date.toUTCString().substring(0, 16);
}

function getTrailDateTime(trail) {
  let dateObj = new Date(trail.ModifiedTime);
  let date = dateObj.toUTCString().substring(0, 16);
  let time = dateObj.toUTCString().substring(17, 100);
  return [date, time];
}

module.exports = {
  getLocationIQURL,
  formatLocationResponse,
  getWeatherBitURL,
  formatWeatherResponse,
  getYelpURL,
  formatYelpResponse,
  getTrailURL,
  formatTrailResponse
};