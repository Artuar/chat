import * as React from "react";
import * as styles from "./TradeChat.scss";
import { Message } from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/messages/messages.actions";
import * as tradesActions from "../../store/trades/trades.actions";
import { formattedMessagesSelector } from "../../store/messages/messages.selectors";
import { ChangeEvent, useEffect, useState } from "react";
import { userIdSelector } from "../../store/user/user.selectors";
import { FormattedTrade } from "../../store/trades/trades.types";

export interface IChat {
  trade: FormattedTrade;
}

const useStateSelectors = () => ({
  userId: useSelector(userIdSelector),
  messages: useSelector(formattedMessagesSelector),
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    fetchMessages: () => dispatch(actions.requestMessages.request()),
    sendMessage: (text: string) => dispatch(actions.sendMessage.request(text)),
    deleteCurrentTrade: () => dispatch(tradesActions.deleteTrades.request()),
  };
};

export const TradeChat: React.FunctionComponent<IChat> = ({ trade }) => {
  const { messages } = useStateSelectors();
  const {
    fetchMessages,
    sendMessage,
    deleteCurrentTrade,
  } = useDispatchActions();
  const [text, setText] = useState("");

  useEffect(() => {
    document.body.addEventListener("keydown", keyboardClickHandler);
    return () =>
      document.body.removeEventListener("keydown", keyboardClickHandler);
  });

  useEffect(() => {
    fetchMessages();
    setText("");
  }, [trade]);

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const keyboardClickHandler = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      send();
    }
  };

  const send = () => {
    setText("");
    sendMessage(text);
  };

  return (
    <section className={styles.chat} data-hook="trade-chat">
      <header className={styles.header}>
        <button
          className={styles.deleteButton}
          data-hook="trade-chat-delete-button"
          onClick={deleteCurrentTrade}
        />
        <span className={styles.card} data-hook="trade-chat-card">
          {trade.card}
        </span>
        <div className={styles.counterparty}>
          <span
            className={styles.name}
            data-hook="trade-chat-counterparty-name"
          >
            {trade.counterparty.name}
          </span>{" "}
          <span
            className={styles.likes}
            data-hook="trade-chat-counterparty-likes"
          >
            +{trade.counterparty.likes}
          </span>
          {" / "}
          <span
            className={styles.dislikes}
            data-hook="trade-chat-counterparty-dislikes"
          >
            -{trade.counterparty.dislikes}
          </span>
        </div>
      </header>

      <section className={styles.messages}>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </section>

      <footer className={styles.footer}>
        <input
          data-hook="trade-chat-message-input"
          value={text}
          className={styles.messageField}
          type="text"
          placeholder="Type your message..."
          onChange={changeInputHandler}
        />
        <button
          className={styles.sendButton}
          data-hook="trade-chat-send-button"
          onClick={send}
        >
          SEND
        </button>
      </footer>
    </section>
  );
};
