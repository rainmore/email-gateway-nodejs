import * as request from "supertest";
import * as app from "../../../main/app";
import StringFormat = require("string-format");

const postData1 = {
  from: "felix <felix@wytn.com.au>",
  to: "rainmore24@gmail.com",
  subject: "test",
  content: "tesdsfdsa fdsa fda fdasft"
};

const apiSendURI = "/api/v1/mail/send";

describe(StringFormat("POST {}", apiSendURI), () => {
  it("should return 200 OK", (done) => {
    request(app).post(apiSendURI)
      .send(postData1)
      .set("Accept", "/application\/json/")
      .expect(200, done);
  });
});
