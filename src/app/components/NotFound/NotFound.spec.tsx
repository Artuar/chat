import * as React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import configureMockStore from "redux-mock-store";
import { NotFound } from "./NotFound";

const TEXT = "TEST_TEXT";

describe("NotFound", () => {
  const mockStore = configureMockStore();
  let store = mockStore({});
  let component: ReactWrapper;

  const mountComponent = () => {
    component = mount(
      <Provider store={store}>
        <NotFound>{TEXT}</NotFound>
      </Provider>
    );
  };

  beforeEach(() => mountComponent());

  afterEach(() => {
    component.exists() && component.unmount();
  });

  it("should render with text", () => {
    expect(
      component.find('[data-hook="not-found"]').getDOMNode().innerHTML
    ).toBe(TEXT);
  });
});
