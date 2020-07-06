import * as React from "react";
import * as styles from "./Message.scss";
import classNames from "classnames";
import {
  FormattedMessage,
  MessageType,
} from "../../store/messages/messages.types";

export const Message: React.FunctionComponent<FormattedMessage> = ({
  userPhoto,
  text,
  type,
  sendTime,
}) => {
  const isReceived = type === MessageType.Received;

  return (
    <div
      className={classNames(styles.message, { [styles.received]: isReceived })}
      data-hook="message"
      data-message-type={type}
    >
      <img
        className={styles.photo}
        data-hook="message-user-photo"
        src={userPhoto}
      />
      <div className={styles.textWrapper}>
        <div className={styles.text} data-hook="message-text">
          {text}
        </div>
        <div className={styles.time} data-hook="message-send-time">
          {sendTime}
        </div>
      </div>
    </div>
  );
};
