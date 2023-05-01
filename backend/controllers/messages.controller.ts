import { RequestHandler, Request, Response } from "express";
import { CreateMessage } from "../actions/message/createMessage";
import { GetUserByUsername } from "../actions/user/getUserByUsername";
import { messageList } from "../classes/messageList";

export const createMessage: RequestHandler = async (
  request: Request,
  response: Response
) => {
  const username = request.body.username;

  const user = await GetUserByUsername.make(username).execute();

  if (!user) {
    return response.status(422).json({
      error: `User not found. Please doublecheck your username and try again.`,
    });
  }

  if (user.getAge() > 9) {
    return response.status(422).json({
      error: "User must be under 10 years old in order to send a message.",
    });
  }
  const message = CreateMessage.make(request.body.message, user).execute();

  messageList.addMessage(message);

  return response.status(200).send();
};
