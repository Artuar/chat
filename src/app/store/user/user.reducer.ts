import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./user.actions";

export interface UserState {
  id: number | undefined;
}

export const userDefaultState: UserState = {
  id: undefined,
};

export const userReducer = (
  state: UserState = userDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.requestUserData.success): {
      const { id } = action.payload;
      return {
        ...state,
        id,
      };
    }
    case getType(actions.changeUserId): {
      return {
        ...state,
        id: action.payload,
      };
    }
    default:
      return state;
  }
};
