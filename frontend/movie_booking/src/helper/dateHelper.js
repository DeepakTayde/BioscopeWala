function extractTime(date_time) {
  // Parse the ISO date string to create a Date object
  const date = new Date(date_time);

  // Get the hours and minutes from the Date object
  let hours = date.getUTCHours(); // Use getUTCHours() for 'Z' format, otherwise getHours()
  const minutes = date.getUTCMinutes();

  // Determine AM or PM suffix
  const amPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0 (midnight), set to 12

  // Format minutes to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time string
  return `${hours}:${formattedMinutes} ${amPm}`;
}
function extractDayMonth(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  // Adding the appropriate suffix (st, nd, rd, th) to the day
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(day)} ${month}`;
}

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const dayMonth = extractDayMonth(date);
  const timeOfDay = extractTime(date);
  return dayMonth + ", " + timeOfDay;
}
