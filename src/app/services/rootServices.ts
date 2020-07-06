import { fetchCurrenciesRate } from "./currenciesRate";
import { Observable } from "rxjs";
import { Currency } from "app/store/currenciesRate/currenciesRate.types";
import { deleteTrade, fetchTrades } from "app/services/trades";
import { fetchMessages, sendMessage } from "app/services/messages";
import { Trade } from "app/store/trades/trades.types";
import { Message } from "app/store/messages/messages.types";
import { User } from "app/store/user/user.types";
import { fetchUserData } from "app/services/user";
import { fetchNotifications } from "app/services/notifications";

export interface Services {
  currenciesRateService(base: Currency): Observable<number>;
  fetchTradesService(): Observable<Trade[]>;
  deleteTradeService(tradeId: number): Observable<undefined>;
  fetchMessagesService(userId: number, tradeId: number): Observable<Message[]>;
  sendMessageService(
    userId: number,
    tradeId: number,
    text: string
  ): Observable<Message>;
  userService(): Observable<User>;
  notificationService(userId: number): Observable<number[]>;
}

export const services: Services = {
  currenciesRateService: fetchCurrenciesRate,
  fetchTradesService: fetchTrades,
  deleteTradeService: deleteTrade,
  fetchMessagesService: fetchMessages,
  sendMessageService: sendMessage,
  userService: fetchUserData,
  notificationService: fetchNotifications,
};
