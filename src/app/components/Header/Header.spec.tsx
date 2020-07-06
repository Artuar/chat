import { ReactWrapper } from "enzyme";
import { Header } from "./Header";
import { testWrapper } from "../../../../test/testWrapper";

describe("Header", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountHeaderComponent = () => {
    const { component, store } = testWrapper(Header, {});
    mountedComponent = component;

    return { component, store };
  };

  it("should render logo without throwing an error", () => {
    const { component } = mountHeaderComponent();
    expect(component.find("#site-header-logo")).toHaveLength(1);
  });
});
