import {CurrencyRateState} from "app/store/currenciesRate/currenciesRate.reducer";
import {UserState} from "app/store/user/user.reducer";
import {TradesState} from "app/store/trades/trades.reducer";
import {MessagesState} from "app/store/messages/messages.reducer";
import {NotificationsState} from "app/store/notifications/notifications.reducer";

export interface RootState {
  currenciesRates: CurrencyRateState;
  user: UserState;
  trades: TradesState;
  messages: MessagesState;
  notifications: NotificationsState;
}
