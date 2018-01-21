import { Request } from "express";
import { ISendDto } from "../dto/sendDto";

export let sendDtoValidate = (req: Request): void => {
  const sendDto: ISendDto = req.body as ISendDto;
  req.checkBody("from", "Empty").notEmpty();
  req.check("from", "Invalid email address").validEmail();

  if (sendDto.replyTo != undefined) {
    req.checkBody("replyTo", "Empty").notEmpty();
    req.check("replyTo", "Invalid email address").validEmail();
  }
  req.checkBody("subject", "No exists").exists();
  req.checkBody("subject", "Empty").notEmpty();
  req.checkBody("content", "No exists").exists();
  req.checkBody("content", "Empty").notEmpty();

  if (sendDto.to == undefined && sendDto.cc == undefined && sendDto.bcc == undefined) {
    req.checkBody("to", "No exists").exists();
    req.checkBody("cc", "No exists").exists();
    req.checkBody("bcc", "No exists").exists();
  }
  if (sendDto.to != undefined) {
    req.checkBody("to", "Empty").notEmpty();
  }
  if (sendDto.cc != undefined) {
    req.checkBody("cc", "Empty").notEmpty();
  }
  if (sendDto.bcc != undefined) {
    req.checkBody("bcc", "Empty").notEmpty();
  }
};
