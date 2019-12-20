const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/dbConfig.js");

describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
})

describe('should register and login users', function() {
  beforeAll(async () => {
    await db("users").truncate();
  });

  const user = { username: "sofia", password: "12345"}
  
  describe('register functionality', function() {
    it('register should return status 201 and return a token', function() {
      return request(server)
      .post('/api/auth/register')
      .send(user)
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.token).toBeTruthy();
      })
    })
    it('duplicate user should return status 400', function() {
      return request(server)
      .post('/api/auth/register')
      .send(user)
      .then(res => {
        expect(res.status).toBe(400);
      })
    })
  })


  describe('login functionality', function() {
    it('login should return status 200 and return a token', function() {
      return request(server)
      .post('/api/auth/login')
      .send(user)
      .then(res => {
        
        expect(res.status).toBe(200);
        expect(res.body.token).toBeTruthy();
      })
    })

    it('wrong password should return a 401', function() {
      return request(server)
      .post('/api/auth/login')
      .send({ username: "sofia", password: "1234" })
      .then(res => {
        expect(res.status).toBe(401);
      })
    })
  })
})