module.exports = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  var hours = String(today.getHours()).padStart(2, "0");
  var minutes = String(today.getMinutes()).padStart(2, "0");
  var seconds = String(today.getSeconds()).padStart(2, "0");

  today =
    yyyy + "-" + mm + "-" + dd + " " + hours + ":" + minutes + ":" + seconds;
  return today;
};
