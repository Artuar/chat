import { ActionType } from "typesafe-actions";
import * as currenciesRateActions from "./currenciesRate/currenciesRate.actions";
import * as userActions from "./user/user.actions";
import * as tradesActions from "./trades/trades.actions";
import * as messagesActions from "./messages/messages.actions";
import * as notificationsActions from "./notifications/notifications.actions";

export type CurrenciesRateAction = ActionType<typeof currenciesRateActions>;
export type UserAction = ActionType<typeof userActions>;
export type TradesAction = ActionType<typeof tradesActions>;
export type MessagesAction = ActionType<typeof messagesActions>;
export type NotificationsAction = ActionType<typeof notificationsActions>;

export type RootAction =
  | CurrenciesRateAction
  | UserAction
  | TradesAction
  | MessagesAction
  | NotificationsAction;
