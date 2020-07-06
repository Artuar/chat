import { ReactWrapper } from "enzyme";
import { TradeChat } from "./TradeChat";
import {
  FormattedTrade,
  TradeStatus,
  TradeType,
} from "../../store/trades/trades.types";
import { Currency } from "../../store/currenciesRate/currenciesRate.types";
import { testWrapper } from "../../../../test/testWrapper";
import { messagesDefaultState } from "../../store/messages/messages.reducer";
import { Message } from "../../store/messages/messages.types";
import { userDefaultState } from "../../store/user/user.reducer";
import { tradesDefaultState } from "../../store/trades/trades.reducer";
import * as messagesActions from "../../store/messages/messages.actions";
import * as tradesActions from "../../store/trades/trades.actions";

const TRADE = {
  id: 1,
  num: 13,
  seller: {
    id: 100500,
    photoUrl: "/assets/rabbit.jpg",
    name: "Rabbit",
    likes: 3,
    dislikes: 1,
  },
  buyer: {
    id: 500100,
    photoUrl: "/assets/fox.jpg",
    name: "Fox",
    likes: 37,
    dislikes: 1,
  },
  card: "Amazon Gift Card",
  amount: 77,
  currencyFrom: "USD",
  currencyTo: "BTC",
  status: "paid",
  hash: "45aFD3Rr",
  startDate: 1593780443845,
  endDate: 1593780445845,
};

const FORMATTED_TRADE: FormattedTrade = {
  id: 1,
  num: 13,
  counterparty: {
    id: 500100,
    photoUrl: "/assets/fox.jpg",
    name: "Fox",
    likes: 37,
    dislikes: 1,
  },
  type: TradeType.Sell,
  card: "Amazon Gift Card",
  amount: 77,
  currencyFrom: Currency.USD,
  currencyTo: Currency.BTC,
  status: TradeStatus.Paid,
  hash: "45aFD3Rr",
  startDate: 1593780443845,
  endDate: 1593780445845,
};

const MESSAGES: Message[] = [
  {
    id: 1002,
    userId: 500100,
    text:
      "At sit dico platonem rationibus, mel ea dolores legendos eloquentiam.",
    sendTime: new Date(1593846016827).toLocaleTimeString(),
    tradeId: 1,
  },
  {
    id: 1001,
    userId: 100500,
    text:
      "Commune referrentur voluptatibus quo cu, altera alienum concludaturque ad quo.",
    sendTime: new Date(1593844216827).toLocaleTimeString(),
    tradeId: 1,
  },
];

describe("TradeChat", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountTradeChatComponent = (initialState = {}, initialProps = {}) => {
    const { component, store } = testWrapper(TradeChat, {
      initialState: {
        trades: {
          ...tradesDefaultState,
          trades: [TRADE],
          currentTradeId: 1,
        },
        messages: {
          ...messagesDefaultState,
          messages: [...MESSAGES],
          ...initialState,
        },
        user: {
          ...userDefaultState,
          id: 100500,
        },
      },
      initialProps: {
        trade: FORMATTED_TRADE,
        ...initialProps,
      },
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render messages correctly", () => {
    const { component } = mountTradeChatComponent();

    expect(component.find('[data-hook="message"]')).toHaveLength(
      MESSAGES.length
    );
  });

  it("should render card name correctly", () => {
    const { component } = mountTradeChatComponent();

    expect(
      component.find('[data-hook="trade-chat-card"]').getDOMNode().textContent
    ).toBe(FORMATTED_TRADE.card);
  });

  it("should render counterparty name correctly", () => {
    const { component } = mountTradeChatComponent();

    expect(
      component.find('[data-hook="trade-chat-counterparty-name"]').getDOMNode()
        .textContent
    ).toBe(FORMATTED_TRADE.counterparty.name);
  });

  it("should render counterparty likes correctly", () => {
    const { component } = mountTradeChatComponent();

    expect(
      component.find('[data-hook="trade-chat-counterparty-likes"]').getDOMNode()
        .textContent
    ).toBe(`+${FORMATTED_TRADE.counterparty.likes}`);
  });

  it("should render counterparty dislikes correctly", () => {
    const { component } = mountTradeChatComponent();

    expect(
      component
        .find('[data-hook="trade-chat-counterparty-dislikes"]')
        .getDOMNode().textContent
    ).toBe(`-${FORMATTED_TRADE.counterparty.dislikes}`);
  });

  it("should call fetchMessages", () => {
    const { store } = mountTradeChatComponent();

    expect(store.getActions()[0]).toEqual(
      messagesActions.requestMessages.request()
    );
  });

  it("should call deleteTrade", () => {
    const { component, store } = mountTradeChatComponent();

    component.find('[data-hook="trade-chat-delete-button"]').simulate("click");

    expect(store.getActions()[1]).toEqual(tradesActions.deleteTrades.request());
  });

  it("should call sendMessage", () => {
    const TEST_VALUE = "Test test test";
    const { component, store } = mountTradeChatComponent();

    component
      .find("[data-hook='trade-chat-message-input']")
      .simulate("change", { target: { value: TEST_VALUE } });

    component.find('[data-hook="trade-chat-send-button"]').simulate("click");

    expect(store.getActions()[1]).toEqual(
      messagesActions.sendMessage.request(TEST_VALUE)
    );
  });
});
