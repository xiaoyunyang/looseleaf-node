const app = require('../server/server');
const supertest = require('supertest');
const cheerio = require('cheerio');

describe('html response', () => {
  let request;
  beforeEach(() => {
    request = supertest(app) // SuperTest builds up the request.
      .get('/test/') // You visit the "/test" URL.
      .set('User-Agent', 'a cool browser')
      .set('Accept', 'text/html'); // Sets a header describing what content type we want back from the server
  });
  it('returns an HTML response', (done) => {
    request
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done);
  });
  it('returns your User Agent', (done) => {
    request
      .expect((res) => {
        const htmlResponse = res.text;
        const $ = cheerio.load(htmlResponse);
        const userAgent = $('.user-agent').html().trim();
        if (userAgent !== 'a cool browser') {
          throw new Error('User Agent not found');
        }
      })
      .end(done);
  });
// ...
});
