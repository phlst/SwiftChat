import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "./store/store";

const StateProvider = ({ children }) => {
  const { store } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default StateProvider;
