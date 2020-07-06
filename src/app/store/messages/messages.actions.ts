import { createAsyncAction } from "typesafe-actions";
import { Message} from "app/store/messages/messages.types";

export const requestMessages = createAsyncAction(
  '@messages/FETCH_REQUEST',
  '@messages/FETCH_SUCCESS',
  '@messages/FETCH_FAILURE',
)<undefined, Message[], Error>();

export const sendMessage = createAsyncAction(
  '@messages/SEND_REQUEST',
  '@messages/SEND_SUCCESS',
  '@messages/SEND_FAILURE',
)<string, Message, Error>();
