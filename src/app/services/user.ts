import { Observable, from } from "rxjs";
import { User } from "app/store/user/user.types";
import { fetchUserDataMock } from "../../mocks/mockData";

export const fetchUserData = (): Observable<User> => {
  return from(fetchUserDataMock());
};
