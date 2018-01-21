import { ISendDto } from "./sendDto";
import { IMessage } from "../../../services/mails/dto/messsage";
import * as mail from "../../../services/mails/dto/mail";

export let parseSendDto = (dto: ISendDto): IMessage => {
  const message = {} as IMessage;

  const from = mail.parseOneMail(dto.from);
  const replyTo = (dto.replyTo) ? mail.parseOneMail(dto.replyTo) : undefined;
  const to = (dto.to) ? mail.parseMails(dto.to) : [];
  const cc = (dto.cc) ? mail.parseMails(dto.cc) : [];
  const bcc = (dto.bcc) ? mail.parseMails(dto.bcc) : [];

  if (from) {
    message.from = from;
  }

  if (replyTo) {
    message.replyTo = replyTo;
  }

  message.to = to;

  if (cc.length > 0) {
    message.cc = cc;
  }
  if (bcc.length > 0) {
    message.bcc = bcc;
  }

  if (dto.subject) {
    message.subject = dto.subject;
  }

  if (dto.content) {
    message.content = dto.content;
  }

  return message;
};
