import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../helper/user";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function BookingConfirmation() {
  const { id, city } = useParams();
  const [booking, setBooking] = useState({});
  const token = getToken();

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/api/" +
          city +
          "/booking-confirmed-detail/" +
          id +
          "/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((Response) => setBooking(Response.data))
      .catch((error) => console.log(error));
  }, [city, id, token]);

  function extractTime(dateTimeString) {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${hours}:${formattedMinutes}${amPm}`;
  }

  function extractDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function calculateSeatCost() {
    return booking.seats
      ? booking.seats.reduce((acc, seat) => acc + seat.cost, 0)
      : 0;
  }

  function calculateTotal() {
    const seats_cost = calculateSeatCost();
    const gst = seats_cost * 0.18;
    const convenience = 50;
    return seats_cost + gst + convenience;
  }

  return (
    <section className="flex justify-center items-center">
      <div className="container p-5 rounded-md  my-2 min-h-[80vh] bg-blue-950">
        <div className="flex flex-col justify-center gap-2 items-center">

          <div className="flex gap-2 justify-center items-center mb-2 bg-blue-900 py-3 px-4 rounded-md">
            <h2 className="text-white text-3xl font-bold">
              Booking confirmed successfully
            </h2>
            <TiTick className="tick" size={25} />
          </div>

        {booking &&
        booking.screening_object &&
        booking.screening_object.movie_object &&
        booking.screening_object.date_time ? (
          <div className="flex justify-center gap-10">
            <img
              src={booking.screening_object.movie_object.poster_url}
              // width="280"
              // height={}
              alt="Movie Poster"
              className="rounded-md max-h-80"
            />
            <div className="flex flex-col justify-evenly items-start">
              <h2 className="text-white font-bold m-0">
                {booking.screening_object.movie_object.title} (
                {booking.screening_object.movie_object.languages})
              </h2>
              <h5 className="text-neutral-300 m-0">{booking.screening_object.movie_object.genre}</h5>
              <hr className="bg-white"></hr>
              <h5 className="text-neutral-300 m-0">
                {booking.screening_object.theatre_object.name},{" "}
                {booking.screening_object.theatre_object.address}
              </h5>
              <h5 className="text-neutral-300 m-0">{extractTime(booking.screening_object.date_time)}</h5>
              <h5 className="text-neutral-300 m-0">{extractDate(booking.screening_object.date_time)}</h5>
              <h5 className="text-neutral-300 m-0">
                {booking.seats
                  .map((seat) => `${seat.row}${seat.number}`)
                  .join(", ")}
              </h5>
              <h5 className="text-neutral-300 m-0">Price: ₹{calculateTotal().toFixed(2)}</h5>
            </div>
          </div>
        ) : (
          <p>Loading booking details...</p>
        )}

        <h5 className="text-center text-neutral-300 m-0">
          See all your bookings <Link to="/my_bookings">here</Link>.
        </h5>
        </div>
      </div>
    </section>
  );
}

export default BookingConfirmation;
