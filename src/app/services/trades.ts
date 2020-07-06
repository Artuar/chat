import { Observable, from } from "rxjs";
import {Trade} from "app/store/trades/trades.types";
import {fetchTradesMock, deleteTradeMock} from "../../mocks/mockData";

export const fetchTrades = (): Observable<Trade[]> => {
  return from(fetchTradesMock());
};

export const deleteTrade = (tradeId: number): Observable<undefined> => {
  return from(deleteTradeMock(tradeId));
};
