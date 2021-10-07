require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  test('GET /location returns location info', async () => {
    const expectation = {
      formatted_query: expect.any(String),
      latitude: expect.any(String),
      longitude: expect.any(String)
    };

    const data = await fakeRequest(app)
      .get('/location?search=portland')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test('GET /reviews returns business info', async () => {
    const expectation = {
      name: expect.any(String),
      image_url: expect.any(String),
      price: expect.any(String),
      rating: expect.any(Number),
      url: expect.any(String)
    };

    const data = await fakeRequest(app)
      .get('/reviews?latitude=45.5202471&longitude=-122.6741949')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expect.arrayContaining([expectation]));
  });

  test('GET /trails returns trail info', async () => {
    const expectation = {
      name: expect.any(String),
      location: expect.any(String),
      length: expect.any(Number),
      stars: expect.any(Number),
      star_votes: expect.any(Number),
      summary: expect.any(String),
      trail_url: expect.any(String),
      conditions: expect.any(String),
      condition_date: expect.any(String),
      condition_time: expect.any(String),
    };

    const data = await fakeRequest(app)
      .get('/trails?latitude=35.0844&longitude=-106.6504')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expect.arrayContaining([expectation]));
  });
});
