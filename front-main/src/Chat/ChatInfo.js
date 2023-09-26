export const getDate = () => {
  const year_month_day = new Date().toISOString().slice(0, 10);
  const week = new Date().toDateString().slice(0, 3);
  return `${year_month_day} (${week})`;
};

export const getTime = () => {
  const hour = String(new Date().getHours()).padStart(2, '0');
  const minute = String(new Date().getMinutes()).padStart(2, '0');
  return `${hour}:${minute}`;
};
