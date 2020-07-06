import {
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import { Epic, combineEpics } from "redux-observable";
import {RootAction, UserAction} from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { isActionOf } from "typesafe-actions";
import * as actions from "../user/user.actions";
import { Services } from "app/services/rootServices";

const fetchUserEpic: Epic<
  RootAction,
  UserAction,
  RootState,
  Services
  > = (action$, state$, { userService }) => {
  return action$.pipe(
    filter(isActionOf(actions.requestUserData.request)),
    switchMap(() =>
      userService().pipe(
        map(actions.requestUserData.success),
      ),
    ),
  );
};

export const userEpic = combineEpics(
  fetchUserEpic
);
