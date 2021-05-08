import { createSelector } from "reselect";

const getToast = (state) => state.toast;

export const getToastState = createSelector([getToast], (toast) => toast);

export const isToastShown = createSelector([getToast], (toast) => toast.show);
