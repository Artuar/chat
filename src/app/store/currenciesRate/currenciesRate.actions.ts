import { createStandardAction, createAsyncAction } from "typesafe-actions";
import { ChosenCurrencies } from "../currenciesRate/currenciesRate.types";

export const setCurrencies = createStandardAction(
  "@currenciesRate/SET_CURRENCIES"
)<ChosenCurrencies>();

export const requestCurrenciesRates = createAsyncAction(
  "@currenciesRate/START",
  "@currenciesRate/SUCCESS",
  "@currenciesRate/FAILURE",
  "@currenciesRate/FINISH"
)<undefined, number, Error>();
