import * as request from "supertest";
import * as app from "../main/app";

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app).get("/reset")
      .expect(404, done);
  });
});
