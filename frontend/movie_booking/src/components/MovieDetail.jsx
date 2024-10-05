import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieDetail() {
  const { id, city } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/" + city + "/movie-detail/" + id)
      .then((response) => setMovie(response.data))
      .catch((error) => console.log(error));
  }, [id, city]);

  function getTodayFormatted() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  let date = getTodayFormatted();
  let navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    navigate("/" + city + "/movie_screenings/" + id + "/" + date);
  }

  return (
    <section className="flex justify-center items-center">
      <div className="container p-10 rounded-md  my-2 min-h-[80vh] bg-blue-950">
        <div lassName="justify-centre relative hidden lg:block">
          <div className="flex justify-center gap-2 mx-10">
            <img
              src={movie.poster_url}
              width={279}
              height={402}
              className=" rounded-md"
              alt={movie.title}
            />

            <iframe
              
              className="rounded-md w-full"
              src={`https://www.youtube.com/embed/${movie.trailer_url}?rel=0`}
              title={movie.title}
              frameborder="5"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              sandbox="allow-same-origin allow-scripts"
            ></iframe>
          </div>
          <div className="flex flex-col w-full gap-3">
            <div className=" relative mx-10">
                <div className="flex flex-col justify-center gap-1 rounded-md items-center bg-blue-600 bg-opacity-40 py-2 my-2">
                <h2 className="font-bold text-white grid-cols-1">{movie.title}</h2>
                <p className="text-neutral-300 grid-cols-1">{movie.description}</p>
                </div>
                <div  className=" grid grid-cols-3 gap-1">
                  
                  <h5 className="text-white grid-cols-1 rounded-md items-center bg-blue-600 bg-opacity-40 py-3 text-center">Director: <span className="text-sm text-neutral-300">{movie.director}</span></h5>
                  <h5 className="text-white grid-cols-2 rounded-md items-center bg-blue-600 bg-opacity-40 py-3 text-center">Actors: <span className="text-sm text-neutral-300">{movie.actors}</span></h5>
                  <h5 className="text-white grid-cols-3 rounded-md items-center bg-blue-600 bg-opacity-40 py-3 text-center">Duration: <span className="text-sm text-neutral-300">{movie.running_time} min</span> </h5>
                  

                  
                  <h5 className="text-white grid-cols-4 rounded-md items-center bg-blue-600 bg-opacity-40 py-3 text-center">Languages: <span className="text-sm text-neutral-300">{movie.languages}</span></h5>
                  <h5 className="text-white grid-cols-5 rounded-md items-center bg-blue-600 bg-opacity-40 py-3 text-center">Genre: <span className="text-sm text-neutral-300">{movie.genre}</span></h5>
                  <h5 className="text-white grid-cols-6 rounded-md items-center bg-blue-600 bg-opacity-40 py-3 text-center">Rating: <span className="text-sm text-neutral-300">{movie.rating}/10</span></h5>
                  

                </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <button className=" hover:text-white mt-3 text-black rounded px-4 py-2 text-center text-lg font-bold bg-gradient-to-l from-red-500 to-orange-500 shadow-md  hover:scale-105 transition-all" onClick={handleClick}>
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MovieDetail;
