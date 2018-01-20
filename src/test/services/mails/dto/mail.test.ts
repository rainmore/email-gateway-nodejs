import * as supertest from "supertest";
import * as chai from "chai";
import StringFormat = require("string-format");

import * as mail from "../../../../main/services/mails/dto/mail";

const expect = chai.expect;

describe("mail", () => {
  const mailWithName = { email: "test@test.com", name: "test" } as mail.IMail;
  const mailWithoutName = { email: "test@test.com" } as mail.IMail;
  const mailValidWithName: string = "test <test@test.com>";
  const mailValidWithoutName: string = "test@test.com";
  const mailInalid: string = "test";

  describe("mail.formatMail()", () => {
    describe(StringFormat("given a email: {email}, name: {name}", mailWithName), () => {
      it(StringFormat("should print the mail as {}", mailValidWithName), () => {
        expect(mail.formatMail(mailWithName)).eq(mailValidWithName);
      });
    });

    describe(StringFormat("given a email: {email}, name: {name}", mailWithoutName), () => {
      it(StringFormat("should print the mail as {}", mailValidWithoutName), () => {
        expect(mail.formatMail(mailWithoutName)).eq(mailValidWithoutName);
      });
    });
  });

  describe("mail.parseOneMail()", () => {
    describe(StringFormat("given a {}", mailValidWithName), () => {
      it("should parse the mail", () => {
        const address = mail.parseOneMail(mailValidWithName);
        expect(address.email).exist;
        expect(address.name).exist;
      });
    });

    describe(StringFormat("given a {}", mailValidWithoutName), () => {
      it("should parse the mail with name undefined", () => {
        const address = mail.parseOneMail(mailValidWithoutName);
        expect(address.email).exist;
        expect(address.name).not.exist;
      });
    });

    describe(StringFormat("given a {}", mailInalid), () => {
      it("should not parse the mail", () => {
        const address = mail.parseOneMail(mailInalid);
        console.log(address);
        expect(address).undefined;
      });
    });
  });

  describe("mail.parseMails()", () => {
    describe(StringFormat("given a {}", mailValidWithName), () => {
      it("should parse the mail", () => {
        expect(mail.formatMail(mailWithName)).eq(mailValidWithName);
      });
    });

    describe(StringFormat("given a {}", mailValidWithoutName), () => {
      it("should parse the mail", () => {
        expect(mail.formatMail(mailWithoutName)).eq(mailValidWithoutName);
      });
    });
  });

});
