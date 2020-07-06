import { createSelector } from "reselect";
import { RootState } from "../rootState";
import { CurrencyRateState } from "./currenciesRate.reducer";
import { ChosenCurrencies } from "./currenciesRate.types";

const currenciesRateStateSelector = (state: RootState): CurrencyRateState => state.currenciesRates;

export const chosenCurrenciesSelector = createSelector(
  currenciesRateStateSelector,
  ({ from, to }: CurrencyRateState): ChosenCurrencies => ({ from, to })
);

export const currenciesRateSelector = createSelector(
  currenciesRateStateSelector,
  ({ rate }: CurrencyRateState) => rate
);
