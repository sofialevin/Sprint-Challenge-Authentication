const request = require("supertest");
const server = require("../api/server.js");

describe("jokes router", () => {
  
  it("should return status 400 without auth", function() {
    return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.status).toBe(400);
      })
  })
  it("should return an array of jokes", function() {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "user", password: "pass" })
      .then(res => {
        const token = res.body.token;

        return request(server)
          .get('/api/jokes')
          .set("authorization", token)
          .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
      })
    })
  })
})