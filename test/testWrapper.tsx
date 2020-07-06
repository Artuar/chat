import * as React from 'react';
import configureMockStore from "redux-mock-store";
import {mount, ReactWrapper} from "enzyme";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import * as ReactReduxHooks from "react-redux";
import {tradesDefaultState} from "../src/app/store/trades/trades.reducer";
import {userDefaultState} from "../src/app/store/user/user.reducer";
import {notificationsDefaultState} from "../src/app/store/notifications/notifications.reducer";
import {currenciesRateDefaultState} from "../src/app/store/currenciesRate/currenciesRate.reducer";
import {messagesDefaultState} from "../src/app/store/messages/messages.reducer";

interface TestOptions {
  initialState?: any;
  initialProps?: any;
  route?: string;
}

export const testWrapper = (Node: React.FunctionComponent<any>, {
  initialState = {},
  initialProps = {},
  route = '',
}: TestOptions) => {
  const mockStore = configureMockStore();
  const store = mockStore({
    trades: tradesDefaultState,
    user: userDefaultState,
    notifications: notificationsDefaultState,
    currenciesRates: currenciesRateDefaultState,
    messages: messagesDefaultState,
    ...initialState,
  });

  jest
    .spyOn(ReactReduxHooks, "useDispatch")
    .mockImplementation(() => store.dispatch);

  let component: ReactWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Node {...initialProps}/>
        </MemoryRouter>
      </Provider>
    );

    return { component, store };
};