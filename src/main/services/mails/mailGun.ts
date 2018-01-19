import * as request from "request";
import FormData = require("form-data");
import { IMessage } from "./dto/messsage";
import * as mail from "./dto/mail";

const base64Encode = (str: string): string => {
  return new Buffer(str).toString("base64");
};

const messageToDto = (form: FormData, message: IMessage): void => {
  form.append("from", mail.formatMail(message.from));
  if (message.replyTo) {
    form.append("h:Reply-To", base64Encode(mail.formatMail(message.replyTo)));
  }
  if (message.to) {
    for (const to of message.to) {
      form.append("to", mail.formatMail(to));
    }
  }
  if (message.cc) {
    for (const cc of message.cc) {
      form.append("cc", mail.formatMail(cc));
    }
  }
  if (message.bcc) {
    for (const bcc of message.bcc) {
      form.append("bcc", mail.formatMail(bcc));
    }
  }
  form.append("subject", message.subject);
  form.append("text", message.content);
};

export let postMessage = (message: IMessage, requestCallback: request.RequestCallback) => {
  const options = {
    method: "POST",
    uri: "https://api.mailgun.net/v3/" + process.env.MAILS_MAILGUN_DOMAIN + "/messages",
    headers: {
      "User-Agent": "Request-Promise",
      "Authorization": "Basic " + base64Encode("api:" + process.env.MAILS_MAILGUN_APIKEY)
    }
  };

  const r = request(options, requestCallback);
  const form = r.form();
  messageToDto(form, message);
};
