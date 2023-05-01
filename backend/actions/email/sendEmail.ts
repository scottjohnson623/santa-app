import emailClient from "../../clients/emailClient";

export class SendEmail {
  _to: string;
  _from: string;
  _subject: string;
  _text: string;

  constructor(to: string, from: string, subject: string, text: string) {
    this._to = to;
    this._from = from;
    this._subject = subject;
    this._text = text;
  }

  static make(
    to: string,
    from: string,
    subject: string,
    text: string
  ): SendEmail {
    return new SendEmail(to, from, subject, text);
  }

  async execute(): Promise<void> {
    let email = {
      from: this._from,
      to: this._to,
      subject: this._subject,
      text: this._text,
    };

    emailClient.sendMail(email, (err) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        throw err;
      }
    });
  }
}
