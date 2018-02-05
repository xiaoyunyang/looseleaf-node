var app = require("../server/server")
var supertest = require("supertest");

describe("plain text response", function() {
  var request;
  beforeEach(function() {
    request = supertest(app) // SuperTest builds up the request.
      .get("/test/")  // You visit the "/test" URL.
      .set("User-Agent", "my cool browser")
      .set("Accept", "text/plain") // Sets a header describing what content type we want back from the server
  })
  it("returns a plain text response", function(done) {
     request
      .expect("Content-Type", /text\/plain/)
      .expect(200)
      .end(done);
  })
  it("returns your User Agent", function(done) {
     request
      .expect(function(res) {
        if (res.text !== "my cool browser") {
          throw new Error("Response does not contain User Agent");
        }
      })
      .end(done);
  })
// ...
})
