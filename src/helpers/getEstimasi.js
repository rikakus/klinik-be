module.exports = (date) => {
  let currentTime;

  if (date instanceof Date && !isNaN(date)) {
    currentTime = date;
  } else {
    currentTime = new Date();
  }

  const newTime = new Date(currentTime.getTime() + 30 * 60000);

  const year = newTime.getFullYear();
  const month = String(newTime.getMonth() + 1).padStart(2, "0");
  const day = String(newTime.getDate()).padStart(2, "0");
  const hours = String(newTime.getHours()).padStart(2, "0");
  const minutes = String(newTime.getMinutes()).padStart(2, "0");
  const seconds = String(newTime.getSeconds()).padStart(2, "0");

  const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTime;
};
