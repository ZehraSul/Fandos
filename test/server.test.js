const chai = require("chai");
const request = require("request");

describe("API Tests", function () {
  describe("Login API", function () {
    it("should return 400 on invalid request", function (done) {
      request.post(
        "http://localhost:8000/api/login",
        {},
        function (error, response, body) {
          chai.expect(response.statusCode).to.equal(400);
          chai
            .expect(response.body)
            .to.contain('{"message":"Required fields not populated"}');
          done();
        }
      );
    });
  });

  describe("Register API", function () {
    it("should return 400 on mismatching passwords", function (done) {
      request.post(
        "http://localhost:8000/api/register",
        {
          form: {
            emailAddress: "test@test.com",
            password: "test",
            confirmPassword: "test1",
          },
        },
        function (error, response, body) {
          chai.expect(response.statusCode).to.equal(400);
          chai
            .expect(response.body)
            .to.contain('{"message":"Passwords do not match"}');
          done();
        }
      );
    });

    it("should return 400 on invalid request", function (done) {
      request.post(
        "http://localhost:8000/api/register",
        {},
        function (error, response, body) {
          chai.expect(response.statusCode).to.equal(400);
          chai
            .expect(response.body)
            .to.contain('{"message":"Required fields not populated"}');
          done();
        }
      );
    });

    it("should return 400 on invalid email", function (done) {
      request.post(
        "http://localhost:8000/api/register",
        {
          form: {
            emailAddress: "tester",
            password: "test",
            confirmPassword: "test",
          },
        },
        function (error, response, body) {
          chai.expect(response.statusCode).to.equal(400);
          chai.expect(response.body).to.contain('{"message":"Invalid email"}');
          done();
        }
      );
    });
  });

  describe("Cart API Auth", function () {
    it("should return 403 on missing auth header", function (done) {
      request.get(
        "http://localhost:8000/api/cart/displayAll",
        function (error, response, body) {
          chai
            .expect(response.body)
            .to.contain('{"message":"Missing Auth Header!"}');
          chai.expect(response.statusCode).to.equal(403);
          done();
        }
      );
    });
  });
});
