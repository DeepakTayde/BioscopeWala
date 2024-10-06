import axios from "axios";
import { useEffect, useState } from "react";
import { getToken, getCity } from "../helper/user";
import { calculateTotal } from "../helper/bookingHelper";
import { formatDateTime } from "../helper/dateHelper";
import { Link, useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/my-bookings/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setBookings(response.data))
      .catch((error) => console.log(error));
  }, [token]);

  const handleNavigate = (bookingId) => {
    const city = getCity();
    navigate(`/${city}/booking_confirmation/${bookingId}`);
  };

  return (
    <div className="container p-5 rounded-md  my-2 min-h-[80vh] bg-blue-950">
      <div className="flex flex-col justify-center gap-2 items-center">
        <div className="text-center ">
          <h2 className="text-white">My Bookings</h2>
          <hr className="bg-white"></hr>
        </div>


          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="bg-blue-900 w-auto py-3 px-10 rounded-md flex justify-center"
                onClick={() => handleNavigate(booking.booking_id)}
              >
                <div className="flex justify-between items-center gap-4">
                  <img
                    src={booking.screening_object.movie_object.poster_url}
                    alt={booking.screening_object.movie_object.title}
                    // style={{ width: "70px", height: "100px" }}
                    className="rounded-md h-40"
                  />
                  <div  className="flex flex-col justify-center">

                    <h5 className="text-white text-3xl font-bold">{booking.screening_object.movie_object.title}</h5>
                    <h5 className="text-neutral-300">
                      {formatDateTime(booking.screening_object.date_time)}
                    </h5>
                  </div>
                  <div  className="flex  justify-center items-center gap-2">

                  <h5 className="text-white font-bold">{booking.status}  </h5>
                  <h5 className="text-neutral-300"> ₹{calculateTotal(booking)}</h5>
                  </div>
                </div>

              </div>
            ))
          )}
      </div>
    </div>
  );
}

export default MyBookings;
