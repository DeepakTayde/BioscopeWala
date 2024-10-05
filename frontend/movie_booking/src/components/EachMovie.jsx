import React from "react";
import { Link, useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const EachMovie = ({ data, trending }) => {
  const { city } = useParams();
  //   const { poster_url, rating, title, id, genre, running_time } = data;

  return (
    <Link
      to={"/" + city + "/movie/" + data?.id}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      {data?.poster_url ? (
        <img src={data?.poster_url} alt="movie" />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          No Image Found
        </div>
      )}

      <div className="absolute top-3">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            Now Playing
          </div>
        )}
      </div>
      <div className="absolute con bottom-0 h-24 w-full  backdrop-blur-3xl bg-blue-950/60 p-1">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold text-white mb-0 mt-0">
          {data?.title}
        </h2>
        <div className="text-sm text-white flex justify-between items-center mb-0 mt-0">
          <p className="flex text-sm justify-between items-center ">
            <CiStar />
            <span>{data?.rating}</span>
          </p>
          <p className=" px-1 text-xs  text-white">Rating : {data?.rating}</p>
        </div>
        <div className="text-sm text-white flex justify-between items-center mb-0 mt-0">
          <p>{data?.running_time} min</p>
          <p className="text-xs  text-white">
            Genre: {data?.genre}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EachMovie;
