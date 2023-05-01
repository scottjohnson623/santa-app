import { User } from "../../classes/user";
import { Message } from "../../classes/message";

export class CreateMessage {
  _messageText: string;
  _user: User;

  constructor(messageText: string, user: User) {
    this._messageText = messageText;
    this._user = user;
  }

  static make(messageText: string, user: User): CreateMessage {
    return new CreateMessage(messageText, user);
  }

  execute(): Message {
    return new Message(this._user, this._messageText);
  }
}
