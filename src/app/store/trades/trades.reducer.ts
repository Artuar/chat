import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./trades.actions";
import { Trade } from "app/store/trades/trades.types";

export interface TradesState {
  currentTradeId: number | undefined;
  trades: Trade[];
}

export const tradesDefaultState: TradesState = {
  currentTradeId: undefined,
  trades: [],
};

export const tradesReducer = (
  state: TradesState = tradesDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.openTrade): {
      return {
        ...state,
        currentTradeId: action.payload,
      };
    }
    case getType(actions.requestTrades.success): {
      return {
        ...state,
        trades: action.payload,
      };
    }
    case getType(actions.deleteTrades.success): {
      const tradeId = state.currentTradeId;
      return {
        ...state,
        trades: state.trades.filter(({ id }) => tradeId !== id),
      };
    }
    default:
      return state;
  }
};
