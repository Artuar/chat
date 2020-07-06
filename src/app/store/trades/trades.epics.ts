import {
  filter,
  map,
  switchMap, withLatestFrom,
} from "rxjs/operators";
import { Epic, combineEpics } from "redux-observable";
import {RootAction, TradesAction} from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { isActionOf } from "typesafe-actions";
import * as actions from "../trades/trades.actions";
import { Services } from "app/services/rootServices";
import {currentTradeSelector} from "app/store/trades/trades.selectors";
import {Trade} from "app/store/trades/trades.types";
import {Observable} from "rxjs";

const fetchTradesEpic: Epic<
  RootAction,
  TradesAction,
  RootState,
  Services
  > = (action$, state$, { fetchTradesService }) => {
  return action$.pipe(
    filter(isActionOf(actions.requestTrades.request)),
    switchMap(() =>
      fetchTradesService().pipe(
        map(actions.requestTrades.success),
      ),
    ),
  );
};

const deleteTradeEpic: Epic<
  RootAction,
  TradesAction,
  RootState,
  Services
  > = (action$, state$, { deleteTradeService }) => {
  const currentTrade$ = state$.pipe(map(currentTradeSelector));

  const deleteTrade$ = action$.pipe(
    filter(isActionOf(actions.deleteTrades.request)),
    withLatestFrom(currentTrade$),
    filter(([_, currentTrade]) => Boolean(currentTrade))
  ) as Observable<[{}, Trade]>;

  return deleteTrade$.pipe(
    switchMap(([_, { id }]) =>
      deleteTradeService(id).pipe(
        map(actions.deleteTrades.success),
      ),
    ),
  );
};

export const tradesEpic = combineEpics(
  fetchTradesEpic,
  deleteTradeEpic,
);
