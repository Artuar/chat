import { ReactWrapper } from "enzyme";
import { Content } from "./Content";
import { testWrapper } from "../../../../test/testWrapper";
import { tradesDefaultState } from "../../store/trades/trades.reducer";
import { Currency } from "../../store/currenciesRate/currenciesRate.types";
import { TradeStatus } from "../../store/trades/trades.types";
import * as actions from "../../store/trades/trades.actions";
import * as userActions from "../../store/user/user.actions";
import { userDefaultState } from "../../store/user/user.reducer";
import * as notificationsActions from "../../store/notifications/notifications.actions";

const TRADE = {
  id: 1,
  num: 13,
  seller: {
    id: 100500,
    photoUrl: "/assets/rabbit.jpg",
    name: "Rabbit",
    likes: 3,
    dislikes: 0,
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
  currencyFrom: Currency.USD,
  currencyTo: Currency.BTC,
  status: TradeStatus.Paid,
  hash: "45aFD3Rr",
  startDate: 1593780443845,
  endDate: 1593780445845,
};

describe("Content", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountContentComponent = (
    tradesInitialState = {},
    userInitialState = {},
    route = ""
  ) => {
    const { component, store } = testWrapper(Content, {
      initialState: {
        trades: {
          ...tradesDefaultState,
          ...tradesInitialState,
        },
        user: {
          ...userDefaultState,
          ...userInitialState,
        },
      },
      route,
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render NotFound component if trades list is empty", () => {
    const { component } = mountContentComponent();

    expect(component.find("[data-hook='not-found']")).toHaveLength(1);
  });

  it("should render TradeLink component", () => {
    const { component } = mountContentComponent(
      {
        trades: [{ ...TRADE, id: 2 }, TRADE],
      },
      {},
      "/trade/1"
    );

    expect(component.find("[data-hook='trade-link']")).toHaveLength(2);
  });

  it("should render TradeContent component with Chat and Info", () => {
    const { component } = mountContentComponent(
      {
        trades: [TRADE],
        currentTradeId: 1,
      },
      {},
      "/trade/1"
    );

    expect(component.find("[data-hook='trade-chat']")).toHaveLength(1);
    expect(component.find("[data-hook='trade-info']")).toHaveLength(1);
  });

  it("should redirect from wrong url to first trade", () => {
    const { store } = mountContentComponent(
      {
        trades: [{ ...TRADE, id: 2 }, TRADE],
        currentTradeId: 1,
      },
      {},
      "/any"
    );

    expect(store.getActions()[1]).toEqual(actions.openTrade(2));
  });

  it("should call fetchUser", () => {
    const { store } = mountContentComponent(
      {
        trades: [{ ...TRADE, id: 2 }, TRADE],
        currentTradeId: 1,
      },
      {},
      "/trade/1"
    );

    expect(store.getActions()[2]).toEqual(
      userActions.requestUserData.request()
    );
  });

  it("should call fetchTrades", () => {
    const { store } = mountContentComponent({}, { id: 100500 }, "/trade/1");

    expect(store.getActions()[0]).toEqual(actions.requestTrades.request());
  });

  it("should call fetchTrades", () => {
    const { store } = mountContentComponent({}, { id: 100500 }, "/trade/1");

    expect(store.getActions()[1]).toEqual(
      notificationsActions.requestNotifications.request()
    );
  });
});
