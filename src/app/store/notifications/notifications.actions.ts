import { createAsyncAction, createStandardAction } from "typesafe-actions";

export const requestNotifications = createAsyncAction(
  "@notifications/START",
  "@notifications/SUCCESS",
  "@notifications/FAILURE"
)<undefined, number[], Error>();

export const discardNotifications = createStandardAction(
  "@notifications/DISCARD"
)<number>();
