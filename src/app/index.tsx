import * as React from "react";
import { hot, setConfig } from "react-hot-loader";
import { AppComponent } from "app/components/App/App";
import {fillMockData} from "../mocks/mockData";

setConfig({
  showReactDomPatchNotification: false
});

// Refill localStorage mocked data
fillMockData();

export const App = hot(module)(() => <AppComponent />);
