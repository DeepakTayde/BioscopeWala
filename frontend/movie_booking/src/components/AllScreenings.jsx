import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EachScreening from "./EachScreening";

function AllScreenings() {
  const { id, date, city } = useParams();
  const [screenings, setScreenings] = useState([]);
  const [theatreScreenings, setTheatreScreenings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date); // Track the selected date
  console.log("screen : ",screenings )
  console.log("theatre : ",theatreScreenings )

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/api/" +
          city +
          "/movie-screenings/" +
          id +
          "/" +
          date
      )
      .then((response) => setScreenings(response.data))
      .catch((error) => console.log(error));
  }, [city, id, date]);

  function getNextFiveDaysFromToday() {
    const daysArray = Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    });

    return daysArray;
  }
  const datesArray = getNextFiveDaysFromToday();
  let navigate = useNavigate();

  function handleClick(e, selectedDate) {
    e.preventDefault();
    setSelectedDate(selectedDate); // Update the selected date in state
    navigate("/" + city + "/movie_screenings/" + id + "/" + selectedDate);
  }

  useEffect(() => {
    const groupedByTheatre = screenings.reduce((acc, screening) => {
      const theatreId = screening.theatre;
      const theatreInfo = screening.theatre_object;

      if (!acc[theatreId]) {
        acc[theatreId] = {
          theatre_id: theatreId,
          theatre_name: theatreInfo.name,
          address: theatreInfo.address,
          screenings: [],
        };
      }

      acc[theatreId].screenings.push({
        id: screening.id,
        movie: screening.movie,
        date_time: screening.date_time,
      });

      return acc;
    }, {});

    const theatreScreeningsList = Object.values(groupedByTheatre);
    setTheatreScreenings(theatreScreeningsList);
  }, [screenings]);

  return (
    <section className="flex justify-center items-center">
      <div className="container p-10 rounded-md  my-2 min-h-[80vh] bg-blue-950">
        <div className="justify-centre relative hidden lg:block">
        <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize mx-5">
          Select Date
        </h2>
          <div className="flex justify-center gap-2 mx-10">
            {datesArray.map((dateOption, index) => (
              <button
                onClick={(e) => handleClick(e, dateOption)}
                key={index}
                className={
                  selectedDate === dateOption
                    ? "text-white mt-3 rounded px-4 py-2 text-center text-lg font-bold bg-gradient-to-l from-red-500 to-orange-500 shadow-md  scale-105 transition-all"
                    : "hover:text-white mt-3 text-black rounded px-4 py-2 text-center text-lg font-bold bg-gradient-to-l from-red-500 to-orange-500 shadow-md  hover:scale-105 transition-all" // Change background if selected
                }
              >
                {dateOption}
              </button>
            ))}
          </div>
          <div className="container">
            {theatreScreenings.map((theatreScreening) => (
              <EachScreening
                data={theatreScreening}
                key={theatreScreening.theatre_id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllScreenings;
