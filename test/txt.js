const app = require('../server/server');
const supertest = require('supertest');

describe('plain text response', () => {
  let request;
  beforeEach(() => {
    request = supertest(app) // SuperTest builds up the request.
      .get('/test/') // You visit the "/test" URL.
      .set('User-Agent', 'my cool browser')
      .set('Accept', 'text/plain'); // Sets a header describing what content type we want back from the server
  });
  it('returns a plain text response', (done) => {
    request
      .expect('Content-Type', /text\/plain/)
      .expect(200)
      .end(done);
  });
  it('returns your User Agent', (done) => {
    request
      .expect((res) => {
        if (res.text !== 'my cool browser') {
          throw new Error('Response does not contain User Agent');
        }
      })
      .end(done);
  });
// ...
});
