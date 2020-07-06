import * as React from "react";
import classNames from "classnames";
import * as styles from "./TradeLink.scss";
import {
  FormattedTrade,
  TradeStatus,
  TradeType,
} from "../../store/trades/trades.types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { currenciesRateSelector } from "../../store/currenciesRate/currenciesRate.selectors";
import { currentTradeIdSelector } from "../../store/trades/trades.selectors";

interface ITradeLink {
  trade: FormattedTrade;
  hasUnseenMessages: boolean;
}

const useStateSelectors = () => ({
  rate: useSelector(currenciesRateSelector),
  currentTradeId: useSelector(currentTradeIdSelector),
});

export const TradeLink: React.FunctionComponent<ITradeLink> = ({
  trade,
  hasUnseenMessages,
}) => {
  const history = useHistory();
  const { rate, currentTradeId } = useStateSelectors();
  const isBuying = trade.type === TradeType.Buy;
  const isPaid = trade.status === TradeStatus.Paid;
  const isSelected = trade.id === currentTradeId;
  const counterPartyAmount =
    rate !== undefined ? (trade.amount / rate).toFixed(8) : "-";

  const openTrade = () => {
    history.push({ pathname: `/trade/${trade.id}` });
  };

  return (
    <article
      className={classNames(styles.tradeLink, {
        [styles.selected]: isSelected,
      })}
      onClick={openTrade}
      data-hook="trade-link"
    >
      <section className={classNames(styles.notification)}>
        <div
          data-hook="trade-link-notification"
          data-notification-unseen={hasUnseenMessages}
          className={classNames(styles.point, {
            [styles.unseen]: hasUnseenMessages,
          })}
        />
      </section>
      <section className={styles.data}>
        <span className={styles.name} data-hook="trade-link-name">
          {trade.counterparty.name} is {isBuying ? "selling" : "buying"}
        </span>
        <span className={styles.card} data-hook="trade-link-card">
          {trade.card}
        </span>
        <span className={styles.courses} data-hook="trade-link-amounts">
          {trade.amount} USD ({counterPartyAmount} BTC)
        </span>
      </section>
      <section className={styles.counterparty}>
        <img
          className={styles.photo}
          src={trade.counterparty.photoUrl}
          data-hook="trade-link-counterparty-photo"
        />
        <span
          className={classNames(styles.status, { [styles.paid]: isPaid })}
          data-hook="trade-link-trade-status"
        >
          {isPaid ? "PAID" : "NOT PAID"}
        </span>
      </section>
    </article>
  );
};
