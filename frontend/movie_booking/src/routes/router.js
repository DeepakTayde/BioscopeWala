import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/SignInPage/SignIn";
import SignUp from "../pages/SignUpPage/SignUp";
import HomePage from "../pages/LandingPage/HomePage";
import LandingPage from "../pages/LandingPage/LandingPage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import MovieScreeningsPage from "../pages/MovieScreeningsPage/MovieScreeningsPage";
import ScreeningSeatingPage from "../pages/ScreeningSeatingPage/ScreeningSeatingPage";
import BookingDetailPage from "../pages/BookingDetailPage/BookingDetailPage";
import BookingConfirmedPage from "../pages/BookingConfirmedPage/BookingConfirmedPage";
import MyBookingsPage from "../pages/MyBookingsPage/MyBookingsPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ChangePasswordPage from "../pages/UserProfilePage/ChangePasswordPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
            {
                path: "/signin",
                element: <SignIn/>
            },
            {
                path: "/signup",
                element: <SignUp/>
            },
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "/movies/:city",
                element: <LandingPage/>
            },
            {
                path: "/:city/movie/:id",
                element: <MovieDetailPage/>
            },
            {
                path: "/:city/movie_screenings/:id/:date",
                element: <MovieScreeningsPage/>
            },
            {
                path: "/:city/screening_seats/:id/",
                element: <ScreeningSeatingPage/>
            },
            {
                path: "/:city/booking_details/:id",
                element: <BookingDetailPage/>
            },
            {
                path: "/:city/booking_confirmation/:id",
                element: <BookingConfirmedPage/>
            },
            {
                path: "/my_bookings",
                element: <MyBookingsPage/>
            },
            {
                path: "/user_profile",
                element: <UserProfilePage/>
            },
            {
                path: "/change-password",
                element: <ChangePasswordPage/>
            }
        ]
    }
])

export default router