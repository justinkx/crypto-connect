import {
  SHOW_TOAST,
  SHOW_ERROR_TOAST,
  SHOW_SUCCESS_TOAST,
  HIDE_TOAST,
} from "../action/types";

const initialState = {
  show: false,
  type: "",
  position: "top",
  text1: "",
  text2: "",
  visibilityTime: 4000,
  autoHide: true,
  topOffset: 30,
  bottomOffset: 40,
};

export default function ToastReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        show: true,
        ...action.toastConfig,
      };
    case SHOW_SUCCESS_TOAST:
      return {
        ...state,
        show: true,
        type: "success",
        ...action.toastConfig,
      };
    case SHOW_ERROR_TOAST:
      return {
        ...state,
        show: true,
        type: "error",
        ...action.toastConfig,
      };
    case HIDE_TOAST:
      return {
        ...initialState,
        show: false,
      };
    default:
      return { ...state };
  }
}
