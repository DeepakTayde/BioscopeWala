import AllMovies from "../../components/AllMovies";
import { useParams } from "react-router-dom";
// import TrendingBanner from "../../components/TrendingBanner";

function LandingPage() {
  const { city } = useParams(); // Access the city from the URL

  return (
    <>

      <AllMovies city={city} heading={"Trending"} trending={true} />
    </>
  );
}
export default LandingPage;
