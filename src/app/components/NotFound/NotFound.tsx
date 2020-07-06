import * as React from "react";
import * as styles from "./NotFound.scss";

export const NotFound: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.notFound} data-hook="not-found">
      {children}
    </div>
  );
};
