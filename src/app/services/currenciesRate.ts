import { Observable, from } from "rxjs";
import { Currency } from "app/store/currenciesRate/currenciesRate.types";

export const fetchCurrenciesRate = (
  currency: Currency,
): Observable<number> => {
  const promise = fetch(
    `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`,
  )
    .then((res: Response) => {return res.json()})
    .then(({ bpi }: CurrenciesRateResponse) => bpi[currency].rate_float);
  return from(promise);
};

type Bpi = Record<Currency, {
  code: Currency;
  description: string;
  rate: string;
  rate_float: number;
}>;

export interface CurrenciesRateResponse {
  bpi: Bpi,
}
