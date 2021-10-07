const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { 
  getLocationIQURL,
  getWeatherBitURL,
  formatWeatherResponse,
  getYelpURL,
  formatYelpResponse,
  getTrailURL, 
  formatTrailResponse,
  formatLocationResponse
} = require('./utils.js');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async (req, res) => {
  try {
    const url = getLocationIQURL(req.query.search);
    const response = await request(url);
    res.json(formatLocationResponse(response.body));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const url = getWeatherBitURL(req.query.latitude, req.query.longitude);
    const response = await request(url);
    res.json(formatWeatherResponse(response.body.data));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const url = getYelpURL(req.query.latitude, req.query.longitude);
    const key = process.env.YELP_KEY;
    const response = await request(url).set({ 'Authorization': 'Bearer ' + key });
    res.json(formatYelpResponse(response.body.businesses));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/trails', async (req, res) => {
  try {
    const url = getTrailURL(req.query.latitude, req.query.longitude);
    const response = await request(url);
    res.json(formatTrailResponse(response.body.trails));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
