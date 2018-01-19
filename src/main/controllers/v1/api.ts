import * as request from "request";
import { Response, Request, NextFunction } from "express";
import * as sendGrid from "../../services/mails/sendGrid";
import * as mailGun from "../../services/mails/mailGun";
import { IMessage } from "../../services/mails/dto/messsage";
import * as mail from "../../services/mails/dto/mail";


interface ISendDto {
    from: string;
    replyTo?: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    content?: string;
}

const parseSendDto = (dto: ISendDto): IMessage => {
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

class HttpStatus {
  constructor(public status: number) {
  }

  is2xx() {
    return this.status >= 200 && this.status < 300;
  }
  is3xx() {
    return this.status >= 300 && this.status < 400;
  }
  is4xx() {
    return this.status >= 400 && this.status < 500;
  }
  is5xx() {
    return this.status >= 500;
  }
}

const requestCallback = (apiRes: Response, next: NextFunction, error: any, requestResponse: request.RequestResponse, body: any) => {
    if (error) {
      apiRes.status(422).json({errors: "UNPROCESSED DATA"});
    }
    else if (requestResponse.statusCode) {
      const httpStatus = new HttpStatus(requestResponse.statusCode);
      if (httpStatus.is2xx) {
        apiRes.status(200).json({message: "Message is sent succussfully"});
      }
      else {
        apiRes.status(httpStatus.status).json(body);
        next();
      }
    }
    else {
      apiRes.status(500).json({errors: "Something wrong!"});
      next();
    }
};

const randomBoolean = (): boolean => {
  return Math.random() >= 0.5;
};

/**
 * POST /api/v1/mail/send
 */
export let postMailSend = (req: Request, res: Response, next: NextFunction): void => {
  // TODO to allow fallback to the other gateway.
  if (randomBoolean) {
    postMailSendSendGrid(req, res, next);
  }
  else {
    postMailSendMailGun(req, res, next);
  }
};

/**
 * POST /api/v1/mail/send/send-grid
 */
export let postMailSendSendGrid = (req: Request, res: Response, next: NextFunction): void => {
  sendGrid.postMessage(parseSendDto(req.body), (err, r, body) => {
      requestCallback(res, next, err, r, body);
  });
};

/**
 * POST /api/v1/mail/send/mail-gun
 */
export let postMailSendMailGun = (req: Request, res: Response, next: NextFunction): void => {
  mailGun.postMessage(parseSendDto(req.body), (err, r, body) => {
      requestCallback(res, next, err, r, body);
  });
};
