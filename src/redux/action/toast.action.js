import {
  SHOW_TOAST,
  SHOW_ERROR_TOAST,
  SHOW_SUCCESS_TOAST,
  HIDE_TOAST,
  SHOW_INFO_TOAST,
} from "./types";

export const showToast = (toastConfig) => ({ type: SHOW_TOAST, toastConfig });

export const showSuccessToast = (toastConfig) => ({
  type: SHOW_SUCCESS_TOAST,
  toastConfig,
});

export const showErrorToast = (toastConfig) => ({
  type: SHOW_ERROR_TOAST,
  toastConfig,
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});

export const showInfoToast = (toastConfig) => ({
  type: SHOW_INFO_TOAST,
  toastConfig,
});
