import { ReactWrapper} from "enzyme";
import {Message} from "./Message";
import {MessageType} from "../../store/messages/messages.types";
import {testWrapper} from "../../../../test/testWrapper";

const MESSAGE = {
  "id": 2001,
  "text": "Commune referrentur voluptatibus quo cu, altera alienum concludaturque ad quo.",
  "sendTime": "12:00 PM",
  "type": MessageType.Received,
  "userPhoto": '/test.jpg',
};

describe("Message", () => {
  let mountedComponent: ReactWrapper;

  afterEach(() => {
    mountedComponent.exists() && mountedComponent.unmount();
  });

  const mountMessageComponent = (initialProps = {}) => {
    const { component, store } = testWrapper(Message, {
      initialProps: {
        ...MESSAGE,
        ...initialProps,
      },
    });
    mountedComponent = component;

    return { component, store };
  };

  it("should render user photo correctly", () => {
    const { component } = mountMessageComponent();
    expect(component.find("[data-hook='message-user-photo']").getDOMNode().getAttribute('src')).toBe(MESSAGE.userPhoto);
  });

  it("should render text correctly", () => {
    const { component } = mountMessageComponent();
    expect(component.find("[data-hook='message-text']").getDOMNode().textContent).toBe(MESSAGE.text);
  });

  it("should render send time correctly", () => {
    const { component } = mountMessageComponent();
    expect(component.find("[data-hook='message-send-time']").getDOMNode().textContent).toBe(MESSAGE.sendTime);
  });

  it("should render received message correctly", () => {
    const { component } = mountMessageComponent();
    expect(component.find("[data-hook='message']").getDOMNode().getAttribute('data-message-type')).toBe(MessageType.Received);
  });

  it("should render sent message correctly", () => {
    const { component } = mountMessageComponent({ type: MessageType.Sent});
    expect(component.find("[data-hook='message']").getDOMNode().getAttribute('data-message-type')).toBe(MessageType.Sent);
  });

});
