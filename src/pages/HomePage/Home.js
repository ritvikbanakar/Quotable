import { confirmPasswordReset } from "firebase/auth";
import React from "react";
import { useAuth } from "../../firebase";



const Home = () => {
    const currentUser = useAuth();
    console.log(currentUser);

    return (
        <>
            <p>this is {currentUser?.email || "stranger"} home page</p>
            <p>User id : {currentUser?.uid || "no UID"}</p>
        </>
    )
}

export default Home;