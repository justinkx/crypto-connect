import {
  INITIALIZE_BOOK_CHANNEL,
  SAVE_BOOK,
  RESET_BOOK_CHANNEL,
} from "./types";

export const initializeBook = () => ({ type: INITIALIZE_BOOK_CHANNEL });
export const resetBookChannel = () => ({ type: RESET_BOOK_CHANNEL });
export const saveBook = (book) => ({ type: SAVE_BOOK, book });
