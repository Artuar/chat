export interface Message {
  id: number;
  userId: number;
  tradeId: number;
  text: string;
  sendTime: string;
}

export interface FormattedMessage {
  id: number;
  text: string;
  sendTime: string;
  type: MessageType;
  userPhoto: string;
}

export enum MessageType {
  Sent = "sent",
  Received = "received",
}
