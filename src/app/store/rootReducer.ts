import { combineReducers } from "redux";
import { currenciesRateReducer } from "./currenciesRate/currenciesRate.reducer";
import {userReducer} from "./user/user.reducer";
import {tradesReducer} from "./trades/trades.reducer";
import {messagesReducer} from "./messages/messages.reducer";
import {notificationsReducer} from "./notifications/notifications.reducer";

export const rootReducer = combineReducers({
  currenciesRates: currenciesRateReducer,
  user: userReducer,
  trades: tradesReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
});
