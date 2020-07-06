import * as React from "react";
import * as styles from "./TradeInfo.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { FormattedTrade, TradeStatus } from "../../store/trades/trades.types";
import { currenciesRateSelector } from "../../store/currenciesRate/currenciesRate.selectors";
import { getTimeDiff } from "./TradeInfo.helpers";

export interface ITradeInfo {
  trade: FormattedTrade;
}

const useStateSelectors = () => ({
  rate: useSelector(currenciesRateSelector),
});

export const TradeInfo: React.FunctionComponent<ITradeInfo> = ({ trade }) => {
  const { rate } = useStateSelectors();

  if (trade === undefined) {
    return null;
  }

  const getTimeText = () => {
    const beginning = isPaid ? "Finished" : "Started";
    return `${beginning} ${getTimeDiff(trade.endDate || trade.startDate)}`;
  };

  const isPaid = trade.status === TradeStatus.Paid;
  const counterPartyAmount =
    rate !== undefined ? (trade.amount / rate).toFixed(8) : "-";

  return (
    <aside className={styles.tradeInfo} data-hook="trade-info">
      <div className={styles.header}>
        <h3 className={styles.heading} data-hook="trade-info-heading">
          Your are trading with {trade.counterparty.name}
        </h3>
        <span className={styles.time} data-hook="trade-info-time">
          {getTimeText()}
        </span>
        {isPaid ? (
          <button
            data-hook="trade-info-release-button"
            className={styles.releaseButton}
          >
            Release bitcoins
          </button>
        ) : null}
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.counterparty}>
          <img
            className={styles.photo}
            src={trade.counterparty.photoUrl}
            data-hook="trade-info-counterparty-photo"
          />
          <p className={styles.rating}>
            <span
              className={styles.likes}
              data-hook="trade-info-counterparty-likes"
            >
              +{trade.counterparty.likes}
            </span>
            {" / "}
            <span
              className={styles.dislikes}
              data-hook="trade-info-counterparty-dislikes"
            >
              -{trade.counterparty.dislikes}
            </span>
          </p>
        </div>
        <div>
          <span># OF TRADES</span>
          <span data-hook="trade-info-number">{trade.num}</span>
        </div>
        <div>
          <span>TRADE STATUS</span>
          <span
            data-hook="trade-info-status"
            className={classNames(styles.status, { [styles.paid]: isPaid })}
          >
            {isPaid ? "PAID" : "NOT PAID"}
          </span>
        </div>
        <div>
          <span>TRADE HASH</span>
          <span data-hook="trade-info-hash" className={styles.hash}>
            {trade.hash}
          </span>
        </div>
        <div>
          <span data-hook="trade-info-currency-from">
            AMOUNT {trade.currencyFrom}
          </span>
          <span className={styles.usd} data-hook="trade-info-amount-from">
            {trade.amount}
          </span>
        </div>
        <div>
          <span data-hook="trade-info-currency-to">
            AMOUNT {trade.currencyTo}
          </span>
          <span className={styles.btc} data-hook="trade-info-amount-to">
            {counterPartyAmount}
          </span>
        </div>
      </div>
    </aside>
  );
};
