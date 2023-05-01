import { Message } from "./message";

export class MessageList {
  _messages: Message[];

  constructor(messages: Message[] = []) {
    this._messages = messages;
  }

  addMessage(message: Message): void {
    this._messages.push(message);
  }

  clearMessages(): void {
    this._messages = [];
  }

  toEmailString(): string {
    return this._messages
      .map((message: Message) => message.toEmailString())
      .join("\n\n");
  }

  isNotEmpty(): boolean {
    return this._messages.length > 0;
  }
}

export const messageList = new MessageList();
