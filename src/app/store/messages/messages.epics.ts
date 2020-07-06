import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Epic, combineEpics } from "redux-observable";
import { RootAction, MessagesAction } from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { isActionOf } from "typesafe-actions";
import * as actions from "../messages/messages.actions";
import { Services } from "app/services/rootServices";
import { currentTradeSelector } from "app/store/trades/trades.selectors";
import { Trade } from "app/store/trades/trades.types";
import { userStateSelector } from "app/store/user/user.selectors";
import { User } from "app/store/user/user.types";
import { Observable } from "rxjs";

const fetchMessagesEpic: Epic<
  RootAction,
  MessagesAction,
  RootState,
  Services
> = (action$, state$, { fetchMessagesService }) => {
  const currentTrade$ = state$.pipe(map(currentTradeSelector));
  const user$ = state$.pipe(map(userStateSelector));

  const requestMessages$ = action$.pipe(
    filter(isActionOf(actions.requestMessages.request)),
    withLatestFrom(user$, currentTrade$),
    filter(([_, userData, currentTrade]) => currentTrade !== undefined)
  ) as Observable<[RootAction, User, Trade]>;

  return requestMessages$.pipe(
    switchMap(([_, user, trade]) =>
      fetchMessagesService(user.id, trade.id).pipe(
        map((messages) => actions.requestMessages.success(messages))
      )
    )
  );
};

const sendMessageEpic: Epic<RootAction, MessagesAction, RootState, Services> = (
  action$,
  state$,
  { sendMessageService }
) => {
  const currentTrade$ = state$.pipe(map(currentTradeSelector));
  const user$ = state$.pipe(map(userStateSelector));

  const sendMessage$ = action$.pipe(
    filter(isActionOf(actions.sendMessage.request)),
    withLatestFrom(user$, currentTrade$),
    filter(
      ([{ payload }, userId, currentTrade]) =>
        userId !== undefined && payload !== "" && currentTrade !== undefined
    )
  ) as Observable<[{ payload: string }, User, Trade]>;

  return sendMessage$.pipe(
    switchMap(([{ payload }, user, trade]) =>
      sendMessageService(user.id, trade.id, payload).pipe(
        map((message) => actions.sendMessage.success(message))
      )
    )
  );
};

export const messagesEpic = combineEpics(fetchMessagesEpic, sendMessageEpic);
