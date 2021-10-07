const {
  formatLocationResponse,
  formatWeatherResponse,
  formatYelpResponse,
  formatTrailResponse
} = require('../lib/utils.js');

describe('API response formatting', () => {

  test('Trail data is formatted correctly', () => {
    const expectation = [{
      name: 'Tingley Field',
      location: 'Albuquerque',
      length: 0.5740743180983,
      stars: 3,
      star_votes: 1,
      summary: 'This redeveloped park provides a catchment basin in monsoon season%2C and the new recreation facilities and walking trail are great for the whole family.',
      trail_url: 'https://prescriptiontrails.org/trail/1/tingley-field/',
      conditions: '6-foot+ wide sidewalk, 4-foot wide gravel on 2 sides',
      condition_date: 'Mon, 30 Sep 2019',
      condition_time: '18:55:21 GMT'
    }];

    const apiData = [{
      id: 1,
      name: 'Tingley Field',
      city: 'Albuquerque',
      zip: 87102,
      crossstreets: 'Coal and 10th SW',
      address: '10 Atlantic Ave SW',
      transit: 'ABQ Ride Stops:  #53, #54',
      lat: '35.0772432',
      lng: '-106.6555564',
      desc: 'This%20redeveloped%20park%20provides%20a%20catchment%20basin%20in%20monsoon%20season%2C%20and%20the%20new%20recreation%20facilities%20and%20walking%20trail%20are%20great%20for%20the%20whole%20family.',
      lighting: 'On trail and parking lot',
      difficulty: 1,
      surface: '6-foot+ wide sidewalk, 4-foot wide gravel on 2 sides',
      parking: 'On site',
      facilities: 'Restrooms',
      hours: '6 a.m. - 10 p.m.',
      loopcount: 1,
      satImgURL: 'https://prescriptiontrails.org/admin/new/images/1450547549tingleyParkSat.png',
      largeImgURL: 'https://prescriptiontrails.org/admin/new/images/1455036748P1130010.jpg',
      thumbURL: 'https://prescriptiontrails.org/admin/new/images/square_1455036748P1130010.jpg',
      attractions: [
        '%3Ca%20href%3D%22https%3A%2F%2Fwww.cabq.gov%2Fculturalservices%2Fbiopark%2Fzoo%22%3EZoo%3C%2Fa%3E%20located%20across%2010th%20Street',
        'Tennis%20courts%20across%208th%20street',
        'Shaded%20playgrounds%20and%20picnic%20area',
        'Grassy%20field',
        'Softball%20fields'
      ],
      loops: {
        1: {
          name: 'Main Loop',
          distance: '0.6',
          steps: 1267
        }
      },
      published: 'true',
      rating: 3,
      ratings: 1,
      favorites: 0,
      ModifiedTime: '2019-09-30 11:55:21',
      reviews: 1,
      distance: 0.5740743180983,
      url: 'https://prescriptiontrails.org/trail/1/tingley-field/'
    }];

    const result = formatTrailResponse(apiData);
    expect(result).toEqual(expectation);
  });

  test('Review data is formatted correctly', () => {

    const expectation = [{
      name: 'Mother’s Bistro & Bar',
      image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/5lWNz5gC1jNp1zFxDXUfkg/o.jpg',
      price: '$$',
      rating: 4.5,
      url: 'https://www.yelp.com/biz/mother-s-bistro-and-bar-portland?adjust_creative=NwKope3UQ-E3sA6INKR5fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=NwKope3UQ-E3sA6INKR5fg'
    }];

    const apiData = [{
      id: 'n73rxa6e6-fTIxQzfv4BuA',
      alias: 'mother-s-bistro-and-bar-portland',
      name: 'Mother’s Bistro & Bar',
      image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/5lWNz5gC1jNp1zFxDXUfkg/o.jpg',
      is_closed: false,
      url: 'https://www.yelp.com/biz/mother-s-bistro-and-bar-portland?adjust_creative=NwKope3UQ-E3sA6INKR5fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=NwKope3UQ-E3sA6INKR5fg',
      review_count: 4521,
      categories: [
        { alias: 'breakfast_brunch', title: 'Breakfast & Brunch' },
        { alias: 'tradamerican', title: 'American (Traditional)' },
        { alias: 'bars', title: 'Bars' }
      ],
      rating: 4.5,
      coordinates: { latitude: 45.522196, longitude: -122.673868 },
      transactions: ['delivery'],
      price: '$$',
      location: {
        address1: '121 SW 3rd Ave',
        address2: '',
        address3: '',
        city: 'Portland',
        zip_code: '97204',
        country: 'US',
        state: 'OR',
        display_address: ['121 SW 3rd Ave', 'Portland, OR 97204']
      },
      phone: '+15034641122',
      display_phone: '(503) 464-1122',
      distance: 218.19896889784573
    }];

    const result = formatYelpResponse(apiData);
    expect(result).toEqual(expectation);
  });

  test('Location data is formatted correctly', () => {

    const expectation = {
      formatted_query: 'Portland, Multnomah County, Oregon, USA',
      latitude: '45.5202471',
      longitude: '-122.6741949'
    };

    const apiData = [{
      place_id: '274178303',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'relation',
      osm_id: '186579',
      boundingbox: ['45.432536', '45.6528812', '-122.8367489', '-122.4720252'],
      lat: '45.5202471',
      lon: '-122.6741949',
      display_name: 'Portland, Multnomah County, Oregon, USA',
      class: 'boundary',
      type: 'administrative',
      importance: 0.7535657174337683,
      icon: 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
    }];

    const result = formatLocationResponse(apiData);
    expect(result).toEqual(expectation);
  });

  test('Weather data is formatted correctly', () => {

    const expectation = [{
      forecast: 'Broken clouds',
      time: 'Thu, 07 Oct 2021'
    }];

    const apiData = [{
      moonrise_ts: 1633621447,
      wind_cdir: 'ENE',
      rh: 79,
      pres: 1015.25,
      high_temp: 13.2,
      sunset_ts: 1633657017,
      ozone: 326.344,
      moon_phase: 0.0377817,
      wind_gust_spd: 5,
      snow_depth: 0,
      clouds: 42,
      ts: 1633590060,
      sunrise_ts: 1633616254,
      app_min_temp: 8.1,
      wind_spd: 1.90089,
      pop: 20,
      wind_cdir_full: 'east-northeast',
      slp: 1020.33,
      moon_phase_lunation: 0.05,
      valid_date: '2021-10-07',
      app_max_temp: 13.2,
      vis: 24.096,
      dewpt: 6.6,
      snow: 0,
      uv: 2.89648,
      weather: { icon: 'c03d', code: 803, description: 'Broken clouds' },
      wind_dir: 62,
      max_dhi: null,
      clouds_hi: 8,
      precip: 0.0625,
      low_temp: 7.3,
      max_temp: 13.2,
      moonset_ts: 1633660292,
      datetime: '2021-10-07',
      temp: 10.3,
      min_temp: 8.1,
      clouds_mid: 0,
      clouds_low: 38
    }];

    const result = formatWeatherResponse(apiData);
    expect(result).toEqual(expectation);
  });
});