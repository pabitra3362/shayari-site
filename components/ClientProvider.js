"use client";

import { store } from "@/app/store";
import { Provider } from "react-redux";
import SessionWrapper from "./SessionWrapper";

export const ClientProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionWrapper>{children}</SessionWrapper>
    </Provider>
  );
};
