import { useState, useEffect } from "react"; // Import useEffect for handling side effectsimport { CgProfile } from "react-icons/cg"; // Ensure you import this
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { setCity } from "../helper/user";
import axios from "axios";
// import { getUser, clearUser } from "../helper/user";
import { IoSearchOutline } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";
import { navigation } from "../constants/navigation";
import ProfileUser from "../components/ProfileUser"

function Navbar() {
  const { city } = useParams();
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results

  let navigate = useNavigate();
  // let loginStatus = getUser() ? true : false;
  // function handleLogout() {
  //   clearUser();
  //   localStorage.setItem("user");
  // }

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity); // Save the selected city to local storage
    navigate("/movies/" + selectedCity); // Navigate to the new city route
  };

  useEffect(() => {
    // Fetch search results if input length is 3 or more
    const fetchSearchResults = async () => {
      if (searchInput.length >= 3) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/movies-search?query=${searchInput}`
          );
          setSearchResults(response.data); // Update search results state
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]); // Clear results on error
        }
      } else {
        setSearchResults([]); // Clear results if input is less than 3 characters
      }
    };

    fetchSearchResults(); // Call the function
  }, [searchInput]); // Dependency array to run effect when searchInput changes

  const handleResultClick = (movieId) => {
    navigate("/" + city + "/movie/" + movieId);
    setSearchInput("");
    setSearchResults([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-blue-950 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <span className=" text-3xl bg-gradient-to-r from-red-500 to-orange-500  inline-block text-transparent bg-clip-text shadow-md  hover:scale-105 transition-all ">BioscopeWala</span>
        </Link>

        <div className="ml-auto flex items-center gap-5">
          <form
            action=""
            className=" flex items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search here ...."
              className=" bg-transparent px-4 py-1 outline-none border-none hidden lg:block cursor-text text-white"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            {searchInput.length >= 3 && searchResults?.length === 0 && (
              <div className="no-results-message">No results found.</div>
            )}
            {searchResults?.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(movie.id)}
                  >
                    {movie.title} {console.log(movie)}
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="text-4xl text-white">
              <IoSearchOutline />
            </button>
          </form>
          <div className=" flex items-center">
            <label htmlFor="cities" className=" text-white"></label>
            <select
              id="cities"
              className=" bg-transparent px-1 py-1 outline-none border-none hidden lg:block cursor-text text-white"
              value={city} // Set the value to the current city
              onChange={handleCityChange} // Call the handler on change
            >
              <option className="  text-black" value="Bengaluru">Bengaluru</option>
              <option className="  text-black" value="Hyderabad">Hyderabad</option>
              <option className="  text-black" value="Mumbai">Mumbai</option>
              <option className="  text-black" value="Bhopal">Bhopal</option>
              <option className="  text-black" value="Pune">Pune</option>
            </select>
          </div>

          <div className="z-10">
              <ProfileUser/>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
