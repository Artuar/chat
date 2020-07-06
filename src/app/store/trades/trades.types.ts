import {Currency} from "app/store/currenciesRate/currenciesRate.types";

export interface Trade {
  id: number;
  num: number;
  seller: Counterparty;
  buyer: Counterparty;
  card: string;
  currencyFrom: Currency;
  currencyTo: Currency;
  amount: number;
  status: TradeStatus;
  hash: string;
  startDate: number;
  endDate?: number;
}

export interface Counterparty {
  id: number;
  name: string;
  photoUrl: string;
  likes: number;
  dislikes: number;
}

export interface FormattedTrade {
  id: number;
  counterparty: Counterparty;
  num: number;
  type: TradeType;
  card: string;
  currencyFrom: Currency;
  currencyTo: Currency;
  amount: number;
  status: TradeStatus;
  hash: string;
  startDate: number;
  endDate?: number;
}

export enum TradeStatus {
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export enum TradeType {
  Sell = 'sell',
  Buy = 'buy',
}
