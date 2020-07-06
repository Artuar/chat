import { createSelector } from "reselect";
import { RootState } from "../rootState";
import { UserState } from "app/store/user/user.reducer";

export const userStateSelector = (state: RootState): UserState => state.user;

export const userIdSelector = createSelector(
  userStateSelector,
  ({ id }: UserState) => id
);
