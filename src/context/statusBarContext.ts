import { createContext } from "react";
import { StatusBarStyle } from "expo-status-bar";

export type StatusBarContext = {
  statusBarMode: StatusBarStyle;
  setStatusBarMode: (mode: StatusBarStyle) => void;
};

const context = createContext<StatusBarContext>({
  statusBarMode: "auto",
  setStatusBarMode: () => {},
});

const { Consumer, Provider } = context;

export {
  Consumer as StatusBarContextConsumer,
  Provider as StatusBarContextProvider,
  context as StatusBarContext,
};
