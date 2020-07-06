import {from, Observable} from "rxjs";
import {fetchNotificationsMock} from "../../mocks/mockData";

export const fetchNotifications = (userId: number): Observable<number[]> => {
  return from(fetchNotificationsMock(userId));
};
