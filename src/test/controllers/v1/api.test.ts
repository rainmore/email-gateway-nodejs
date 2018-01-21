import * as request from "supertest";
import * as app from "../../../main/app";
import StringFormat = require("string-format");

const postData1 = {
  from: "felix <felix@wytn.com.au>",
  to: "rainmore24@gmail.com",
  subject: "test",
  content: "tesdsfdsa fdsa fda fdasft"
};

const apiSendURI = "/api/v1/mail/send/send-grid";

describe(StringFormat("POST {}", apiSendURI), () => {
  it("should return 200 OK", (done) => {
    console.log(done);
    request(app).post(apiSendURI)
      .send(postData1)
      .set("Accept", "/application\/json/")
      .expect(200, done);
  });

  describe("Give postData with Invalid data strucuture", () => {
      describe("When from is not provided", () => {
        it("should return 422", (done) => {
          request(app).post(apiSendURI)
            .send({
              to: "rainmore24@gmail.com",
              subject: "test",
              content: "tesdsfdsa fdsa fda fdasft"
            })
            .set("Accept", "/application\/json/")
            .expect(422, done);
        });
      });
      describe("When from is empty", () => {
        it("should return 422", (done) => {
          request(app).post(apiSendURI)
            .send({
              from: "",
              to: "rainmore24@gmail.com",
              subject: "test",
              content: "tesdsfdsa fdsa fda fdasft"
            })
            .set("Accept", "/application\/json/")
            .expect(422, done);
        });
      });
      describe("When from is invalid email", () => {
        it("should return 422", (done) => {
          request(app).post(apiSendURI)
            .send({
              from: "invalid email",
              to: "rainmore24@gmail.com",
              subject: "test",
              content: "tesdsfdsa fdsa fda fdasft"
            })
            .set("Accept", "/application\/json/")
            .expect(422, done);
        });
      });

      describe("When replyTo is empty", () => {
        it("should return 422", (done) => {
          request(app).post(apiSendURI)
            .send({
              from: "felix <felix@wytn.com.au>",
              replyTo: "",
              to: "rainmore24@gmail.com",
              subject: "test",
              content: "tesdsfdsa fdsa fda fdasft"
            })
            .set("Accept", "/application\/json/")
            .expect(422, done);
        });
      });
      describe("When replyTo is invalid email", () => {
        it("should return 422", (done) => {
          request(app).post(apiSendURI)
            .send({
              from: "felix <felix@wytn.com.au>",
              replyTo: "invalid email",
              to: "rainmore24@gmail.com",
              subject: "test",
              content: "tesdsfdsa fdsa fda fdasft"
            })
            .set("Accept", "/application\/json/")
            .expect(422, done);
        });
      });
  });
});
