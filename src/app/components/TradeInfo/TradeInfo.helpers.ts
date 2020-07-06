export const getTimeDiff = (timestamp: number) => {
  const minutes = (new Date().getTime() - timestamp) / 1000 / 60;
  if (minutes < 60) {
    return `${minutes.toFixed(0)} minutes ago`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${hours.toFixed(0)} hours ago`;
  }
  return `${(hours / 24).toFixed(0)} days ago`;
};
