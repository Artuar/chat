import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/user/user.actions";
import * as styles from "./Header.scss";
import { userIdSelector } from "../../store/user/user.selectors";

const useStateSelectors = () => ({
  userId: useSelector(userIdSelector),
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    changeUserId: (id: number) => dispatch(actions.changeUserId(id)),
  };
};

export const Header: React.FunctionComponent = () => {
  const { userId } = useStateSelectors();
  const { changeUserId } = useDispatchActions();

  const changeUser = () => {
    changeUserId(userId === 100500 ? 500100 : 100500);
  };

  return (
    <header className={styles.header} id="site-header">
      <div className={styles.logo} onClick={changeUser} id="site-header-logo">
        PΛXFUL
      </div>
    </header>
  );
};
