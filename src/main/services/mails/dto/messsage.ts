import { IMail } from "./mail";

export interface IMessage {
  from: IMail;
  replyTo?: IMail;
  to?: IMail[];
  cc?: IMail[];
  bcc?: IMail[];
  subject: string;
  content: string;
}
