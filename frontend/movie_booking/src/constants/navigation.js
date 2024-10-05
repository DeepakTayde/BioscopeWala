import { IoHome } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";


export   const navigation = [
    {
      label: "TV Shows",
      href: "tv",
      icon :<PiTelevisionFill />
    },
    {
      label: "Movies",
      href: "movie",
      icon : <BiSolidMoviePlay />
    },
  ]


export const mobileNavigation =[
    {
        label : "Home",
        href : "/",
        icon : <IoHome />
    },
    ...navigation,
    {
        label : "Search",
        href : "/search",
        icon : <IoSearchOutline />  
    }

]