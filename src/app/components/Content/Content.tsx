import * as React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {formattedTradesSelector} from "../../store/trades/trades.selectors";
import * as actions from "../../store/trades/trades.actions";
import * as userActions from "../../store/user/user.actions";
import * as notificationsActions from "../../store/notifications/notifications.actions";
import {useEffect} from "react";
import * as styles from "./Content.scss";
import {TradeLink} from "../TradeLink/TradeLink";
import {TradeContent} from "../TradeContent/TradeContent";
import {userIdSelector} from "../../store/user/user.selectors";
import {notificationTradeIdsSelector} from "../../store/notifications/notificatins.selectors";
import {NotFound} from "../NotFound/NotFound";

const useStateSelectors = () => ({
  userId: useSelector(userIdSelector),
  trades: useSelector(formattedTradesSelector),
  notificationsTradeIds: useSelector(notificationTradeIdsSelector),
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    fetchTrades: () =>  dispatch(actions.requestTrades.request()),
    fetchUserData: () =>  dispatch(userActions.requestUserData.request()),
    fetchNotifications: () =>  dispatch(notificationsActions.requestNotifications.request())
  };
};

export const Content: React.FunctionComponent = () => {
  const { trades, userId, notificationsTradeIds } = useStateSelectors();
  const { fetchTrades, fetchUserData, fetchNotifications } = useDispatchActions();

  useEffect(() => {
    if (userId === undefined) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
      fetchTrades();
      fetchNotifications();
    }
  }, [userId]);

  if (trades.length  === 0) {
    return <NotFound>You don`t have active trades. Try reload the page :)</NotFound>;
  }

  return (
    <main className={styles.content} data-hook="site-content">
      <Router>
        <nav className={styles.tradesList}>
          {trades.map(trade =>
            <TradeLink
              key={trade.id}
              trade={trade}
              hasUnseenMessages={notificationsTradeIds.includes(trade.id)}
            />)}
        </nav>
        <Switch>
          <Route path="/trade/:id">
            <TradeContent />
          </Route>
          <Route exact path="*">
            <Redirect to={'/trade/' + trades[0].id}/>
          </Route>
        </Switch>
      </Router>
    </main>
  );
};
