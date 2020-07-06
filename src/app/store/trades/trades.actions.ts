import { createStandardAction, createAsyncAction } from "typesafe-actions";
import { Trade } from "app/store/trades/trades.types";

export const openTrade = createStandardAction("@trades/OPEN_TRADE")<number>();

export const requestTrades = createAsyncAction(
  "@trades/FETCH_REQUEST",
  "@trades/FETCH_SUCCESS",
  "@trades/FETCH_FAILURE"
)<undefined, Trade[], Error>();

export const deleteTrades = createAsyncAction(
  "@trades/DELETE_REQUEST",
  "@trades/DELETE_SUCCESS",
  "@trades/DELETE_FAILURE"
)<undefined, undefined, Error>();
