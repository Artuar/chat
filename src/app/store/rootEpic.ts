import { combineEpics, Epic } from "redux-observable";
import { currenciesRateEpic } from "./currenciesRate/currenciesRate.epics";
import { tradesEpic } from "app/store/trades/trades.epics";
import { messagesEpic } from "app/store/messages/messages.epics";
import { userEpic } from "app/store/user/user.epics";
import { notificationsEpic } from "app/store/notifications/notifications.epics";

export const rootEpic: Epic = combineEpics(
  currenciesRateEpic,
  tradesEpic,
  messagesEpic,
  userEpic,
  notificationsEpic
);
