import { createSelector } from "reselect";
import { RootState } from "../rootState";
import { TradesState } from "./trades.reducer";
import { Trade, TradeType, FormattedTrade } from "./trades.types";
import { userIdSelector } from "../user/user.selectors";

const tradesStateSelector = (state: RootState): TradesState => state.trades;

export const tradesSelector = createSelector(
  tradesStateSelector,
  ({ trades }: TradesState) => trades
);

export const currentTradeIdSelector = createSelector(
  tradesStateSelector,
  ({ currentTradeId }: TradesState) => currentTradeId
);

export const currentTradeSelector = createSelector(
  tradesSelector,
  currentTradeIdSelector,
  (trades, currentTradeId): Trade | undefined =>
    trades.find(({ id }) => id === currentTradeId)
);

export const formattedTradesSelector = createSelector(
  userIdSelector,
  tradesSelector,
  (userId, trades): FormattedTrade[] =>
    trades.map(({ seller, buyer, ...props }) => {
      const type = seller.id === userId ? TradeType.Sell : TradeType.Buy;
      const counterparty = type === TradeType.Sell ? buyer : seller;

      return { type, counterparty, ...props };
    })
);

export const formattedCurrentTradeSelector = createSelector(
  formattedTradesSelector,
  currentTradeIdSelector,
  (trades, currentTradeId): FormattedTrade | undefined =>
    trades.find(({ id }) => id === currentTradeId)
);
