import { ReactWrapper } from "enzyme";
import { TradeStatus, TradeType } from "../../store/trades/trades.types";
import { Currency } from "../../store/currenciesRate/currenciesRate.types";
import { testWrapper } from "../../../../test/testWrapper";
import { currenciesRateDefaultState } from "../../store/currenciesRate/currenciesRate.reducer";
import { TradeInfo } from "./TradeInfo";

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
  amount: 77,
  currencyFrom: Currency.USD,
  currencyTo: Currency.BTC,
  status: TradeStatus.Paid,
  hash: "45aFD3Rr",
  startDate: 1593780443845,
  endDate: 1593780445845,
};

describe("TradeInfo", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountTradeInfoComponent = (initialProps = {}) => {
    const { component, store } = testWrapper(TradeInfo, {
      initialState: {
        currenciesRates: {
          ...currenciesRateDefaultState,
          rate: 9876,
        },
      },
      initialProps: {
        trade: TRADE,
        ...initialProps,
      },
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render header correctly", () => {
    const { component } = mountTradeInfoComponent();

    expect(
      component.find('[data-hook="trade-info-heading"]').getDOMNode()
        .textContent
    ).toBe(`Your are trading with ${TRADE.counterparty.name}`);
  });

  it("should render finish trade time correctly", () => {
    const now = new Date();
    now.setDate(new Date().getDate() - 2);
    const twoDaysAgo = now.getTime();
    const { component } = mountTradeInfoComponent({
      trade: { ...TRADE, endDate: twoDaysAgo },
    });

    expect(
      component.find('[data-hook="trade-info-time"]').getDOMNode().textContent
    ).toBe("Finished 2 days ago");
  });

  it("should render start trade time correctly", () => {
    const now = new Date();
    now.setHours(new Date().getHours() - 4);
    const fourHoursAgo = now.getTime();
    const { component } = mountTradeInfoComponent({
      trade: { ...TRADE, endDate: fourHoursAgo, status: TradeStatus.Unpaid },
    });

    expect(
      component.find('[data-hook="trade-info-time"]').getDOMNode().textContent
    ).toBe("Started 4 hours ago");
  });

  it("should render counterparty photo correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component
        .find("[data-hook='trade-info-counterparty-photo']")
        .getDOMNode()
        .getAttribute("src")
    ).toBe(TRADE.counterparty.photoUrl);
  });

  it("should render counterparty likes correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-counterparty-likes']").getDOMNode()
        .textContent
    ).toBe(`+${TRADE.counterparty.likes}`);
  });

  it("should render counterparty dislikes correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component
        .find("[data-hook='trade-info-counterparty-dislikes']")
        .getDOMNode().textContent
    ).toBe(`-${TRADE.counterparty.dislikes}`);
  });

  it("should render trade number correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-number']").getDOMNode().textContent
    ).toBe(String(TRADE.num));
  });

  it("should render info paid status correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-status']").getDOMNode().textContent
    ).toBe("PAID");
  });

  it("should render info unpaid status correctly", () => {
    const { component } = mountTradeInfoComponent({
      trade: { ...TRADE, status: TradeStatus.Unpaid },
    });
    expect(
      component.find("[data-hook='trade-info-status']").getDOMNode().textContent
    ).toBe("NOT PAID");
  });

  it("should render hash correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-hash']").getDOMNode().textContent
    ).toBe(TRADE.hash);
  });

  it("should render currency from correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-currency-from']").getDOMNode()
        .textContent
    ).toBe(`AMOUNT ${TRADE.currencyFrom}`);
  });

  it("should render amount from correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-amount-from']").getDOMNode()
        .textContent
    ).toBe(String(TRADE.amount));
  });

  it("should render currency to correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-currency-to']").getDOMNode()
        .textContent
    ).toBe(`AMOUNT ${TRADE.currencyTo}`);
  });

  it("should render amount to correctly", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-amount-to']").getDOMNode()
        .textContent
    ).toBe("0.00779668");
  });

  it("should render release button for paid trade", () => {
    const { component } = mountTradeInfoComponent();
    expect(
      component.find("[data-hook='trade-info-release-button']")
    ).toHaveLength(1);
  });

  it("should render NOT release button for unpaid trade", () => {
    const { component } = mountTradeInfoComponent({
      trade: { ...TRADE, status: TradeStatus.Unpaid },
    });
    expect(
      component.find("[data-hook='trade-info-release-button']")
    ).toHaveLength(0);
  });
});
