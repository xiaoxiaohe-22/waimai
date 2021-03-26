import MSite from "../pages/MSite/MSite";
import Search from "../pages/Search/Search";
import Order from "../pages/Order/Order";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Good from "@/pages/Good/Good";

import Rating from "@/pages/Good/Rating/Rating";
import Business from "@/pages/Good/Business/Business";
import Reservation from "@/pages/Good/Reservation/Reservation";

export default [
    {
        path: "/msite",
        component: MSite
    },
    {
        path: "/search",
        component: Search
    },
    {
        path: "/order",
        component: Order
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/good",
        component: Good,
        children: [
            {
                path: "reservation",
                component: Reservation,
            },
            {
                path: "rating",
                component: Rating,
            } ,
            {
                path: "business",
                component: Business,
            },
            {
                path: "/good",
                redirect:"/good/reservation"
            }
        ]
    },
    {
        path: "/",
        redirect: "/msite"

    }
]