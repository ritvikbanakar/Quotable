import React from "react";
import { useAuth } from "../../firebase";
import QuoteBox, {cat} from "../../components/QuoteBox";
import "./Home.css"


const Home = () => {
    const currentUser = useAuth();
    console.log(currentUser);

    return (
        <div className="home-container">
            <p>this is {currentUser?.email || "stranger"} home page</p>
            <p>User id : {currentUser?.uid || "no UID"}</p>

            <div className="quote-boxes">
                <QuoteBox/> 
                <QuoteBox/>
                <QuoteBox/>
                <QuoteBox/>
            </div>
        </div>
    )
}

export default Home;