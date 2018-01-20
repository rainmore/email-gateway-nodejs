import * as addrs from "email-addresses";

export interface IMail {
  email: string;
  name?: string;
}

const isMailBox = (mailbox: addrs.ParsedMailbox): boolean => {
  return "mailbox" == mailbox.type;
};

export let formatMail = (mail: IMail): string => {
  if (mail.name) {
    return mail.name + " <" + mail.email + ">";
  }
  else {
    return mail.email;
  }
};

export let parseOneMail = (str: string): IMail | undefined => {
  const address = addrs.parseOneAddress(str) as addrs.ParsedMailbox;
  if (address && isMailBox(address)) {
    const mail = {email: address.address} as IMail;
    if (address.name) {
      mail.name = address.name;
    }
    return mail;
  }
};

export let parseMails = (str: string): IMail[] => {
  const mails: IMail[] = new Array();
  const addresses = addrs.parseAddressList(str);
  for (const a of addresses) {
    const address = a as addrs.ParsedMailbox;
    if (isMailBox(address)) {
      const mail = {email: address.address} as IMail;
      if (address.name) {
        mail.name = address.name;
      }
      mails.push(mail);
    }
  }
  return mails;
};
