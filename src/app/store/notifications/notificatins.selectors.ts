import { createSelector } from "reselect";
import { RootState } from "../rootState";
import {NotificationsState} from "app/store/notifications/notifications.reducer";

const notificationsStateSelector = (state: RootState): NotificationsState => state.notifications;

export const notificationTradeIdsSelector = createSelector(
  notificationsStateSelector,
  ({ tradeIds }): number[] => tradeIds,
);
