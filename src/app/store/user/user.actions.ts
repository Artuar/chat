import { createStandardAction, createAsyncAction } from "typesafe-actions";
import { User } from "app/store/user/user.types";

export const changeUserId = createStandardAction("@user/CHANGE_USER_ID")<
  number
>();

export const requestUserData = createAsyncAction(
  "@user/REQUEST",
  "@user/SUCCESS",
  "@user/FAILURE"
)<undefined, User, Error>();
