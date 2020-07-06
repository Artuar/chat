import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Epic, combineEpics } from "redux-observable";
import {
  RootAction,
  NotificationsAction,
  MessagesAction,
} from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { isActionOf } from "typesafe-actions";
import * as actions from "../notifications/notifications.actions";
import * as messagesActions from "../messages/messages.actions";
import { Services } from "app/services/rootServices";
import { Observable } from "rxjs";
import { userIdSelector } from "app/store/user/user.selectors";
import { currentTradeSelector } from "app/store/trades/trades.selectors";
import { Trade } from "app/store/trades/trades.types";

const fetchNotificationsEpic: Epic<
  RootAction,
  NotificationsAction,
  RootState,
  Services
> = (action$, state$, { notificationService }) => {
  const user$ = state$.pipe(map(userIdSelector));

  const fetchNotifications$ = action$.pipe(
    filter(isActionOf(actions.requestNotifications.request)),
    withLatestFrom(user$),
    filter(([_, userId]) => userId !== undefined)
  ) as Observable<[{}, number]>;

  return fetchNotifications$.pipe(
    switchMap(([_, userId]) =>
      notificationService(userId).pipe(
        map(actions.requestNotifications.success)
      )
    )
  );
};

const discardNotificationEpic: Epic<
  RootAction,
  NotificationsAction,
  RootState
> = (action$, state$) => {
  const currentTrade$ = state$.pipe(map(currentTradeSelector));

  const requestMessages$ = action$.pipe(
    filter(isActionOf(messagesActions.requestMessages.success)),
    withLatestFrom(currentTrade$),
    filter(([_, currentTrade]) => currentTrade !== undefined)
  ) as Observable<[MessagesAction, Trade]>;

  return requestMessages$.pipe(
    map(([_, { id }]) => actions.discardNotifications(id))
  );
};

export const notificationsEpic = combineEpics(
  fetchNotificationsEpic,
  discardNotificationEpic
);
