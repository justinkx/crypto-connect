import React, { useEffect, memo, useCallback } from "react";
import Toast, { BaseToast } from "react-native-toast-message";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { getToastState } from "../redux/selectors/toast.selector";
import { hideToast } from "../redux/action/toast.action";
import { colors } from "../style/GlobalStyle";

const CloseDark = require("../../assets/close-dark.png");

const ToastProvider = () => {
  const toastState = useSelector((state) => getToastState(state), shallowEqual);
  const dispatch = useDispatch();

  const toastConfig = {
    success: ({ text1, text2, props, ...rest }) => (
      <BaseToast
        {...rest}
        trailingIcon={CloseDark}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{
          backgroundColor: colors.white,
          borderLeftColor: colors.tradeGreen,
        }}
        onTrailingIconPress={() => hide()}
        text1Style={{
          color: colors.black,
          fontWeight: "bold",
        }}
        text2Style={{
          color: colors.black,
        }}
        text1={text1}
        text2={text2}
      />
    ),
    error: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        trailingIcon={CloseDark}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{
          backgroundColor: colors.white,
          borderLeftColor: colors.tradeRed,
        }}
        onTrailingIconPress={() => hide()}
        text1Style={{
          color: colors.black,
          fontWeight: "bold",
        }}
        text2Style={{
          color: colors.black,
        }}
        text1={text1}
        text2={text2}
      />
    ),
    info: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        trailingIcon={CloseDark}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{
          backgroundColor: colors.white,
          borderLeftColor: colors.tabIndicator,
        }}
        onTrailingIconPress={() => hide()}
        text1Style={{
          color: colors.black,
          fontWeight: "bold",
        }}
        text2Style={{
          color: colors.black,
        }}
        text1={text1}
        text2={text2}
      />
    ),
    any_custom_type: () => {},
  };

  useEffect(() => {
    if (toastState.show) {
      const {
        type = "",
        position = "top",
        text1 = "",
        text2 = "",
        autoHide = true,
        visibilityTime = 5000,
        topOffset = 30,
        bottomOffset = 40,
      } = toastState;
      Toast.show({
        type,
        position,
        text1,
        text2,
        autoHide,
        visibilityTime,
        topOffset,
        bottomOffset,
      });
      setTimeout(() => {
        hide();
      }, 5000);
    }
  }, [hide, toastState]);
  const hide = useCallback(() => {
    dispatch(hideToast());
    Toast.hide();
  }, [dispatch]);
  return (
    <>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default memo(ToastProvider);
