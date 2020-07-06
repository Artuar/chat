import * as React from "react";
import {Chat} from "../Chat/Chat";
import {TradeInfo} from "../TradeInfo/TradeInfo";
import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../store/trades/trades.actions";
import {formattedCurrentTradeSelector} from "../../store/trades/trades.selectors";
import {NotFound} from "../NotFound/NotFound";

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    openTrade: (id: number) =>  dispatch(actions.openTrade(id))
  };
};

const useStateSelectors = () => ({
  trade: useSelector(formattedCurrentTradeSelector),
});

export const TradeContent: React.FunctionComponent = () => {
  const { id } = useParams();
  const { openTrade } = useDispatchActions();
  const { trade } = useStateSelectors();

  useEffect(() => {
    openTrade(Number(id));
  }, [id]);

  if (trade === undefined) {
    return <NotFound>Trade id {id} does not exist. Try to chose trade from left side trade list.</NotFound>;
  }

  return (
    <>
      <Chat trade={trade}/>
      <TradeInfo trade={trade}/>
    </>
  );
};
