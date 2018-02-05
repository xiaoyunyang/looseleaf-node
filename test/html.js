var app = require("../server/server")
var supertest = require("supertest");
var cheerio = require("cheerio");

describe("html response", function() {
  var request;
  beforeEach(function() {
    request = supertest(app) // SuperTest builds up the request.
      .get("/test/html")  // You visit the "/test" URL.
      .set("User-Agent", "my cool browser")
      .set("Accept", "text/html") // Sets a header describing what content type we want back from the server
  })
  it("returns an HTML response", function(done) {
     request
      .expect("Content-Type", /html/)
      .expect(200)
      .end(done);
  })
  it("returns your User Agent", function(done) {
     request
      .expect(function(res) {
        var htmlResponse = res.text;
        var $ = cheerio.load(htmlResponse);
        var userAgent = $(".user-agent").html().trim();
        if (userAgent !== "a cool browser") {
          throw new Error("User Agent not found");
        }
      })
      .end(done);
  })
// ...
})
