import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./messages.actions";
import {Message} from "app/store/messages/messages.types";

export interface MessagesState {
  messages: Message[];
}

export const messagesDefaultState: MessagesState = {
  messages: [],
};

export const messagesReducer = (
  state: MessagesState = messagesDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.requestMessages.success): {
      return {
        ...state,
        messages: action.payload
      };
    }
    case getType(actions.sendMessage.success): {
      return {
        ...state,
        messages: [
          action.payload,
          ...state.messages,
        ]
      };
    }
    default:
      return state;
  }
};
