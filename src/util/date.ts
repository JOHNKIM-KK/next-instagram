import { format } from "timeago.js";

export const parsDate = (date: string) => {
  return format(date);
};
