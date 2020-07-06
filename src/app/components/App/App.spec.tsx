import { AppComponent } from "./App";
import { ReactWrapper } from "enzyme";
import { tradesDefaultState } from "../../store/trades/trades.reducer";
import { testWrapper } from "../../../../test/testWrapper";

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
  currencyFrom: "USD",
  currencyTo: "BTC",
  status: "paid",
  hash: "45aFD3Rr",
  startDate: 1593780443845,
  endDate: 1593780445845,
};

describe("AppComponent", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountAppComponent = () => {
    const { component, store } = testWrapper(AppComponent, {
      initialState: {
        trades: {
          ...tradesDefaultState,
          trades: [TRADE],
        },
      },
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render Header correctly", () => {
    const { component } = mountAppComponent();
    expect(component.find("[data-hook='site-header']")).toHaveLength(1);
  });

  it("should render Content correctly", () => {
    const { component } = mountAppComponent();
    expect(component.find("[data-hook='site-content']")).toHaveLength(1);
  });
});
