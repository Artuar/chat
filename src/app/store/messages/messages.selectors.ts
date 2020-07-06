import { createSelector } from "reselect";
import { RootState } from "../rootState";
import {MessagesState} from "./messages.reducer";
import {currentTradeSelector} from "../trades/trades.selectors";
import {userIdSelector} from "../user/user.selectors";
import {MessageType} from "./messages.types";

const messagesStateSelector = (state: RootState): MessagesState => state.messages;

export const currentMessagesSelector = createSelector(
  messagesStateSelector,
  ({ messages }: MessagesState) => messages,
);

export const formattedMessagesSelector = createSelector(
  userIdSelector,
  currentTradeSelector,
  currentMessagesSelector,
  (currentUserId, trade, messages) => {
    if (trade === undefined) {
      return [];
    }
    const { buyer, seller } = trade;

    return messages.map(({id, text, sendTime, userId}) => {
      const sender = buyer.id === userId ? buyer : seller;
      const type = sender.id === currentUserId ? MessageType.Sent : MessageType.Received;

      return {
        id,
        text,
        sendTime,
        userPhoto: sender.photoUrl,
        type,
    }});
  },
);
