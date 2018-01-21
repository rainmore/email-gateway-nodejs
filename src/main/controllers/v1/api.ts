import * as request from "request";
import { Response, Request, NextFunction } from "express";
import * as sendGrid from "../../services/mails/sendGrid";
import * as mailGun from "../../services/mails/mailGun";
import { parseSendDto } from "./dto/sendDtoConverter";
import { sendDtoValidate } from "./validators/sendDtoValidator";

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

const requestCallback = (apiRes: Response,
                         next: NextFunction,
                         error: any,
                         requestResponse: request.RequestResponse,
                         body: any) => {
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
  sendDtoValidate(req);
  const errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
  }
  else {
    sendGrid.postMessage(parseSendDto(req.body), (err, r, body) => {
        requestCallback(res, next, err, r, body);
    });
  }
};

/**
 * POST /api/v1/mail/send/mail-gun
 */
export let postMailSendMailGun = (req: Request, res: Response, next: NextFunction): void => {
  sendDtoValidate(req);
  const errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
  }
  else {
    mailGun.postMessage(parseSendDto(req.body), (err, r, body) => {
        requestCallback(res, next, err, r, body);
    });
  }
};
