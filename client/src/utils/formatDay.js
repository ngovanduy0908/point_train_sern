import dayjs from "dayjs";

export const formatDay = (time) => {
  return dayjs(time).format("YYYY-MM-DD");
};

export const formatDayNotification = (time) => {
  return dayjs(time).format("DD/MM/YYYY HH:mm:ss");
};
