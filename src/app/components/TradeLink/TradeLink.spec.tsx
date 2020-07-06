import { ReactWrapper } from "enzyme";
import { TradeLink } from "./TradeLink";
import { TradeStatus, TradeType } from "../../store/trades/trades.types";
import { Currency } from "../../store/currenciesRate/currenciesRate.types";
import { testWrapper } from "../../../../test/testWrapper";
import { tradesDefaultState } from "../../store/trades/trades.reducer";
import { currenciesRateDefaultState } from "../../store/currenciesRate/currenciesRate.reducer";

const TRADE = {
  id: 1,
  num: 13,
  counterparty: {
    id: 100500,
    photoUrl: "/assets/rabbit.jpg",
    name: "Rabbit",
    likes: 3,
    dislikes: 0,
  },
  type: TradeType.Sell,
  card: "Amazon Gift Card",
  amount: 100,
  currencyFrom: Currency.USD,
  currencyTo: Currency.BTC,
  status: TradeStatus.Paid,
  hash: "45aFD3Rr",
  startDate: 1593780443845,
  endDate: 1593780445845,
};

describe("TradeLink", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountTradeLinkComponent = (initialState = {}, initialProps = {}) => {
    const { component, store } = testWrapper(TradeLink, {
      initialState: {
        trades: {
          ...tradesDefaultState,
          currentTradeId: 1,
          ...initialState,
        },
        currenciesRates: {
          ...currenciesRateDefaultState,
          rate: 9876,
        },
      },
      initialProps: {
        trade: TRADE,
        hasUnseenMessages: false,
        ...initialProps,
      },
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render name correctly for selling trade", () => {
    const { component } = mountTradeLinkComponent();

    expect(
      component.find('[data-hook="trade-link-name"]').getDOMNode().textContent
    ).toBe(`${TRADE.counterparty.name} is buying`);
  });

  it("should render name correctly for buying trade", () => {
    const { component } = mountTradeLinkComponent(
      {},
      {
        trade: { ...TRADE, type: TradeType.Buy },
      }
    );

    expect(
      component.find('[data-hook="trade-link-name"]').getDOMNode().textContent
    ).toBe(`${TRADE.counterparty.name} is selling`);
  });

  it("should render seen notification state", () => {
    const { component } = mountTradeLinkComponent();
    expect(
      component
        .find("[data-hook='trade-link-notification']")
        .getDOMNode()
        .getAttribute("data-notification-unseen")
    ).toBe("false");
  });

  it("should render unseen notification state", () => {
    const { component } = mountTradeLinkComponent(
      {},
      { hasUnseenMessages: true }
    );
    expect(
      component
        .find("[data-hook='trade-link-notification']")
        .getDOMNode()
        .getAttribute("data-notification-unseen")
    ).toBe("true");
  });

  it("should render card correctly", () => {
    const { component } = mountTradeLinkComponent();

    expect(
      component.find('[data-hook="trade-link-card"]').getDOMNode().textContent
    ).toBe(TRADE.card);
  });

  it("should render amounts correctly", () => {
    const { component } = mountTradeLinkComponent();

    expect(
      component.find('[data-hook="trade-link-amounts"]').getDOMNode()
        .textContent
    ).toBe("100 USD (0.01012556 BTC)");
  });

  it("should render counterparty photo correctly", () => {
    const { component } = mountTradeLinkComponent();
    expect(
      component
        .find("[data-hook='trade-link-counterparty-photo']")
        .getDOMNode()
        .getAttribute("src")
    ).toBe(TRADE.counterparty.photoUrl);
  });

  it("should render paid status correctly", () => {
    const { component } = mountTradeLinkComponent();
    expect(
      component.find("[data-hook='trade-link-trade-status']").getDOMNode()
        .textContent
    ).toBe("PAID");
  });

  it("should render unpaid status correctly", () => {
    const { component } = mountTradeLinkComponent(
      {},
      {
        trade: { ...TRADE, status: TradeStatus.Unpaid },
      }
    );
    expect(
      component.find("[data-hook='trade-link-trade-status']").getDOMNode()
        .textContent
    ).toBe("NOT PAID");
  });
});
