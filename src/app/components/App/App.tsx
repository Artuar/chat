import * as React from "react";
import { Content } from "../Content/Content";
import "./App.scss";
import { Header } from "../Header/Header";

export const AppComponent: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};
