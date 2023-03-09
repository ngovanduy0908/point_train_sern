import moment from 'moment';

export const getUserInLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export const formatDate = (date) => {
  const formattedDate = moment
    .utc(date)
    .utcOffset('+0700')
    .format('YYYY-MM-DD');

  return formattedDate;
};
