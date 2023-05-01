import { User } from "./user";

export class Message {
  user: User;
  messageText: string;

  constructor(user: User, message: string) {
    this.user = user;
    this.messageText = message;
  }

  toEmailString(): string {
    return [this.user.username, this.user.address, this.messageText].join("\n");
  }
}
