import { useNavigate, useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";

function EachScreening(props) {
  const { city } = useParams();
  let navigate = useNavigate();
  const { theatre_name, address, screenings } = props.data;

  function formatDateTime(dateTimeString) {
    // Parse the ISO date string to create a Date object
    const date = new Date(dateTimeString);

    // Get the hours and minutes from the Date object
    let hours = date.getUTCHours(); // Use getUTCHours() for 'Z' format, otherwise getHours()
    const minutes = date.getUTCMinutes();

    // Determine AM or PM suffix
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0 (midnight), set to 12

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Return the formatted time string
    return `${hours}:${formattedMinutes} ${amPm}`;
  }

  function handleClick(e, id) {
    e.preventDefault();
    navigate("/" + city + "/screening_seats/" + id);
  }

  return (
    <div className="flex bg-blue-900 justify-between px-4 items-center py-2 rounded-md my-2">
      <div className="flex flex-col items-start justify-between">
        <div className="flex items-center gap-0 text-white">
          <CiStar size={25} />
          <h5 className="text-lg">{theatre_name}</h5>
        </div>
        <p className="text-white">{address}</p>
      </div>

      {screenings.map((obj) => (
        <button
          className="text-white rounded px-4 py-2 text-center text-lg font-bold bg-gradient-to-l from-red-500 to-orange-500 shadow-md  scale-105 transition-all"
          onClick={(e) => handleClick(e, obj.id)}
          key={obj.id}
        >
          {formatDateTime(obj.date_time)}
        </button>
      ))}
    </div>
  );
}
export default EachScreening;
