import React from "react";
import { useAuth } from "../../firebase";



const Home = () => {
    const currentUser = useAuth();

    return (
        <p>this is {currentUser?.email || "stranger"} home page</p>
    )
}

export default Home;