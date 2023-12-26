import moment from 'moment';

export const convertTime = (timestamp: string): string  => {
  const now = moment();
  const targetTime = moment(timestamp);
  const diffInSeconds = now.diff(targetTime, 'seconds');
  const diffInMinutes = now.diff(targetTime, 'minutes');
  const diffInHours = now.diff(targetTime, 'hours');
  const diffInDays = now.diff(targetTime, 'days');
  const diffInMonths = now.diff(targetTime, 'months');
  const diffInYears = now.diff(targetTime, 'years');

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }
}
