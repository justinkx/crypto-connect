import React, { useState, useEffect, memo } from "react";
import { useIsFocused } from "@react-navigation/native";
import hoistNonReactStatics from "hoist-non-react-statics";
import _delay from "lodash/delay";

import { sharedElementDelay } from "../utils/Constants";
import { navigationRef } from "../navigation/navigationRef";

export default function (Component) {
  const WithNavigationFocus = (props) => {
    const [isFocused, setFocused] = useState(false);
    const _isFocused = useIsFocused();

    useEffect(() => {
      const route = navigationRef.current?.getCurrentRoute();
      const { name = "" } = route;

      _isFocused
        ? name !== "ticker-pair" && setFocused(true)
        : setFocused(false);
    }, [_isFocused]);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} isFocused={isFocused} />;
  };
  return hoistNonReactStatics(WithNavigationFocus, Component);
}
