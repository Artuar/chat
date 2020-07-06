import { TradeContent } from "./TradeContent";
import { tradesDefaultState } from "../../store/trades/trades.reducer";
import { testWrapper } from "../../../../test/testWrapper";
import { ReactWrapper } from "enzyme";
import { TradeStatus } from "../../store/trades/trades.types";
import { Currency } from "../../store/currenciesRate/currenciesRate.types";
import * as actions from "../../store/trades/trades.actions";

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

describe("TradeContent", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountTradeContentComponent = (initialState = {}, route = "") => {
    const { component, store } = testWrapper(TradeContent, {
      initialState: {
        trades: {
          ...tradesDefaultState,
          ...initialState,
        },
      },
      route,
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render NotFound component if trades list is empty", () => {
    const { component } = mountTradeContentComponent();

    expect(component.find("[data-hook='not-found']")).toHaveLength(1);
  });

  it("should render TradeChat component", () => {
    const { component } = mountTradeContentComponent({
      trades: [TRADE],
      currentTradeId: TRADE.id,
    });

    expect(component.find("[data-hook='trade-chat']")).toHaveLength(1);
  });

  it("should render TradeInfo component", () => {
    const { component } = mountTradeContentComponent({
      trades: [TRADE],
      currentTradeId: TRADE.id,
    });

    expect(component.find("[data-hook='trade-info']")).toHaveLength(1);
  });

  it("should call openTradeAction", async () => {
    const { store } = mountTradeContentComponent(
      {
        trades: [TRADE],
        currentTradeId: TRADE.id,
      },
      "/trade/1"
    );

    expect(store.getActions()[1].type).toEqual(
      actions.openTrade(TRADE.id).type
    );
  });
});
