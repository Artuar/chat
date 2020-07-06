import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./currenciesRate.actions";
import { Currency } from "../currenciesRate/currenciesRate.types";

export interface CurrencyRateState {
  from: Currency;
  to: Currency;
  rate: number | undefined;
  isFailure: boolean;
}

export const currenciesRateDefaultState: CurrencyRateState = {
  from: Currency.USD,
  to: Currency.BTC,
  rate: undefined,
  isFailure: false,
};

export const currenciesRateReducer = (
  state: CurrencyRateState = currenciesRateDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.setCurrencies): {
      const { from, to } = action.payload;
      return {
        ...state,
        from,
        to,
        isFailure: false,
      };
    }
    case getType(actions.requestCurrenciesRates.success): {
      return {
        ...state,
        rate: action.payload,
        isFailure: false,
      };
    }
    case getType(actions.requestCurrenciesRates.failure): {
      return {
        ...state,
        rate: undefined,
        isFailure: true,
      };
    }
    default:
      return state;
  }
};
