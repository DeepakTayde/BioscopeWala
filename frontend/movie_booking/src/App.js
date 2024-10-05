import { Outlet } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MobileNavigation from "./components/MobileNavigation.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setBannerData } from "./store/movieSlice.js"


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrendingData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/movies/");
          console.log("movie data : ", response.data)
          dispatch(setBannerData(response.data));
        } catch (error) {
          console.log("Error : ", error);
        }
    };
    fetchTrendingData();
  }, [dispatch]);
  return (
    <main className="pb-14  lg:pb-0 bg-blue-900 ">
      <Navbar />
      <div className=" min-h-[90vh] py-16">
        <Outlet/>
      </div>
      <Footer />
      <MobileNavigation/>
    </main>
  );
}

export default App;
