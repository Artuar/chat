import * as React from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import {Chat} from "./Chat";
import {TradeStatus, TradeType} from "../../store/trades/trades.types";
import {Currency} from "../../store/currenciesRate/currenciesRate.types";

const mockStore = configureMockStore();
const store = mockStore({});

const TRADE = {
  "id": 1,
  "num": 13,
  "counterparty": {
    "id": 100500,
    "photoUrl": "/assets/rabbit.jpg",
    "name": "Rabbit",
    "likes": 3,
    "dislikes": 0,
  },
  "type": TradeType.Sell,
  "card": "Amazon Gift Card",
  "amount": 77,
  "currencyFrom": Currency.USD,
  "currencyTo": Currency.BTC,
  "status": TradeStatus.Paid,
  "hash": "45aFD3Rr",
  "startDate": 1593780443845,
  "endDate": 1593780445845
};

describe("Chat", () => {
  it("should render Chat Component without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <Chat trade={TRADE}/>
      </Provider>
    );
  });
});
