import * as request from "request";
import { IMessage } from "./dto/messsage";
import { IMail } from "./dto/mail";

interface IPersonalization {
  to: IMail[];
  cc?: IMail[];
  bcc?: IMail[];
  subject: string;
}

enum MediaType {
  PLAIN = "text/plain",
  HTML = "text/html"
}

interface IContent {
  type: MediaType;
  value: String;
}

interface ISendMessageDto {
  from: IMail;
  replyTo?: IMail;
  subject: string;
  personalizations: IPersonalization[];
  content: IContent[];
}

const messageToDto = (message: IMessage): ISendMessageDto => {
  const personalization = {} as IPersonalization;

  personalization.subject = message.subject;

  if (message.to && message.to.length > 0) {
    personalization.to = message.to;
  }
  if (message.cc && message.cc.length > 0) {
    personalization.cc = message.cc;
  }
  if (message.bcc && message.bcc.length > 0) {
    personalization.bcc = message.bcc;
  }

  const content = {
    value: message.content,
    type: MediaType.PLAIN
  } as IContent;

  const dto = {
    from: message.from,
    subject: message.subject,
    content: [content],
    personalizations: [personalization]
  } as ISendMessageDto;

  if (message.replyTo) {
    dto.replyTo = message.replyTo;
  }

  return dto;
};

export let postMessage = (message: IMessage, requestCallback: request.RequestCallback) => {
  const data = messageToDto(message);
  const options = {
    method: "POST",
    uri: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      "User-Agent": "Request-Promise",
      "Authorization": "Bearer " + process.env.MAILS_SENDGRID_APIKEY
    },
    body: data,
    json: true
  };

  request(options, requestCallback);
};
