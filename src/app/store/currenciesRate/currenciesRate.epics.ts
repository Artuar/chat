import {
  filter,
  map,
  switchMap,
  withLatestFrom,
  mergeMap,
  takeUntil,
  startWith,
  catchError,
} from "rxjs/operators";
import { interval, merge, of } from "rxjs";
import { Epic, combineEpics } from "redux-observable";
import { CurrenciesRateAction, RootAction } from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { isActionOf } from "typesafe-actions";
import * as actions from "../currenciesRate/currenciesRate.actions";
import * as tradesActions from "../trades/trades.actions";
import { Services } from "app/services/rootServices";
import { CURRENCIES_RATE_UPDATING_INTERVAL } from "app/store/currenciesRate/currenciesRate.constants";
import { chosenCurrenciesSelector } from "app/store/currenciesRate/currenciesRate.selectors";
import { currentTradeSelector } from "app/store/trades/trades.selectors";
import { Trade } from "app/store/trades/trades.types";

export const handleCurrenciesChangingEpic: Epic<
  RootAction,
  CurrenciesRateAction,
  RootState
> = (action$, state$) => {
  const currentTrade$ = state$.pipe(map(currentTradeSelector));

  const openTrade$ = action$.pipe(
    filter(isActionOf(tradesActions.openTrade)),
    withLatestFrom(currentTrade$),
    filter(([_, currentTrade]) => Boolean(currentTrade)),
    map(([_, currentTrade]) => currentTrade as Trade)
  );

  return openTrade$.pipe(
    mergeMap(({ currencyFrom, currencyTo }) => {
      return of(
        actions.setCurrencies({ from: currencyFrom, to: currencyTo }),
        actions.requestCurrenciesRates.request()
      );
    })
  );
};

export const updateCurrenciesRateEpic: Epic<
  RootAction,
  CurrenciesRateAction,
  RootState,
  Services
> = (action$, state$, { currenciesRateService }) => {
  const currency$ = state$.pipe(map(chosenCurrenciesSelector));

  const startUpdates$ = action$.pipe(
    filter(isActionOf(actions.requestCurrenciesRates.request))
  );
  const finishUpdates$ = action$.pipe(
    filter(isActionOf(actions.requestCurrenciesRates.cancel))
  );

  return startUpdates$.pipe(
    withLatestFrom(currency$),
    mergeMap(([_, { from }]) => {
      return interval(CURRENCIES_RATE_UPDATING_INTERVAL).pipe(
        startWith(0),
        switchMap(() => {
          return currenciesRateService(from).pipe(
            map((rate: number) => actions.requestCurrenciesRates.success(rate)),
            catchError((error) =>
              of(actions.requestCurrenciesRates.failure(error))
            )
          );
        }),
        takeUntil(merge(startUpdates$, finishUpdates$))
      );
    })
  );
};

export const currenciesRateEpic = combineEpics(
  handleCurrenciesChangingEpic,
  updateCurrenciesRateEpic
);
