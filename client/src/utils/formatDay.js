import dayjs from "dayjs";

export const formatDay = (time) => {
  return dayjs(time).format("YYYY-MM-DD");
};
