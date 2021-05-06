import React, { useState, useEffect, memo } from "react";
import { useIsFocused } from "@react-navigation/native";
import hoistNonReactStatics from "hoist-non-react-statics";
import _delay from "lodash/delay";

import { sharedElementDelay } from "../utils/Constants";

export default function (Component) {
  const WithNavigationFocus = (props) => {
    const [isFocused, setFocused] = useState(false);
    const _isFocused = useIsFocused();
    useEffect(() => {
      _isFocused
        ? setFocused(_isFocused)
        : _delay(setFocused, sharedElementDelay, _isFocused);
    }, [_isFocused]);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} isFocused={isFocused} />;
  };
  return hoistNonReactStatics(WithNavigationFocus, Component);
}
