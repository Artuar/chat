import { Observable, from } from "rxjs";
import { Message } from "app/store/messages/messages.types";
import { getMessagesMock, sendMessageMock } from "../../mocks/mockData";

export const fetchMessages = (
  userId: number,
  tradeId: number
): Observable<Message[]> => {
  return from(getMessagesMock(userId, tradeId));
};

export const sendMessage = (
  userId: number,
  tradeId: number,
  text: string
): Observable<Message> => {
  return from(sendMessageMock(userId, tradeId, text));
};
