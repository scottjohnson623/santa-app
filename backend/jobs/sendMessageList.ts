import { SendEmail } from "../actions/email/sendEmail";
import { MessageList } from "../classes/messageList";

export class SendMessageList {
  _messageList: MessageList;

  constructor(messageList: MessageList) {
    this._messageList = messageList;
  }

  static make(messageList: MessageList): SendMessageList {
    return new SendMessageList(messageList);
  }

  async execute(): Promise<void> {
    if (this._messageList.isNotEmpty()) {
      try {
        //TODO: refactor to load in messages and clear messagelist to prevent sending messages twice if job ends up taking too long to run.
        SendEmail.make(
          "Santa <santa@northpole.com>",
          "North Pole <do_not_reply@northpole.com>",
          "Messages",
          this._messageList.toEmailString()
        ).execute();
        this._messageList.clearMessages();
      } catch (e) {
        console.log(e);
      }
    }
  }
}
