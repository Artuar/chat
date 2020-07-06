import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./notifications.actions";

export interface NotificationsState {
  tradeIds: number[],
}

export const notificationsDefaultState: NotificationsState = {
  tradeIds: [],
};

export const notificationsReducer = (
  state: NotificationsState = notificationsDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.requestNotifications.success): {
      return {
        ...state,
        tradeIds: action.payload,
      };
    }
    case getType(actions.discardNotifications): {
      return {
        ...state,
        tradeIds: state.tradeIds.filter(id => action.payload !== id),
      };
    }
    default:
      return state;
  }
};
