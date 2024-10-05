import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EachMovie from "./EachMovie";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import TrendingBanner from "./TrendingBanner";


function AllMovies({ city, heading, trending }) {
  const [movies, setMovies] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += containerRef.current.offsetWidth;
  };
  const handlePrevious = () => {
    containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/movies/${city}`,
        {
          params: {
            language: selectedLanguage,
            genre: selectedGenre,
          },
        }
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [city, selectedLanguage, selectedGenre]);

  const handleLanguageClick = (language) => {
    if (selectedLanguage === language) {
      setSelectedLanguage("");
    } else {
      setSelectedLanguage(language);
    }
  };

  const handleGenreClick = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(genre);
    }
  };

  const supportedLanguages = ["Telugu", "Kannada", "Hindi", "English"];
  const supportedGenres = [
    "Action",
    "Drama",
    "Romance",
    "Crime",
    "Thriller",
    "Adventure",
    "Fantasy",
  ];
  return (
    <section className=" w-full h-full ">
      <div className=" container rounded-md py-10 mb-2 flex bg-blue-950 mx-auto px-3 mt-2 item items-center justify-around ">
        <div className="flex gap-4 justify-center items-center text-center">
          <h4 className="text-lg text-white font-bold">Languages:</h4>
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageClick(lang)}
              className={
                selectedLanguage === lang ? " backdrop-blur-3xl rounded-r-full bg-blue-700/60 overflow-hidden  text-white rounded-full py-1 px-2" :  "text-white" 
              }
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <h4 className="text-lg text-white font-bold">Genre :</h4>
          {supportedGenres.map((gen) => (
            <button
              key={gen}
              onClick={() => handleGenreClick(gen)}
              className={
                selectedGenre === gen ? "backdrop-blur-3xl rounded-r-full bg-blue-700/60 overflow-hidden text-white rounded-full py-1 px-2" : " text-white" 
              }
            >
              {gen}
            </button>
          ))}
        </div>
      </div>
      <TrendingBanner />

      <div className="  px-10 mt-2">
        <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
          Now Playing
        </h2>
        <div className=" relative">
          <div
            ref={containerRef}
            className="grid px-4 grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none"
          >
            {movies.length > 0 ? (
              movies.map((movie, index) => {
                return (
                  <EachMovie
                    key={movie.id + "heading" + index}
                    data={movie}
                    trending={trending}
                  />
                );
              })
            ) : (
              <p>No movies available</p>
            )}
          </div>
          <div className="absolute top-0 w-full h-full hidden lg:flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="bg-black text-white rounded-full p-1 -mr-2 z-10 bg-opacity-80"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleNext}
              className="bg-black text-white rounded-full p-1 -mr-2 z-10 bg-opacity-80"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AllMovies;
