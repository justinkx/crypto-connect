import React from "react";
import { useIsFocused } from "@react-navigation/native";
import hoistNonReactStatics from "hoist-non-react-statics";

export default function (Component) {
  const WithNavigationFocus = (props) => {
    const isFocused = useIsFocused();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} isFocused={isFocused} />;
  };
  return hoistNonReactStatics(WithNavigationFocus, Component);
}
