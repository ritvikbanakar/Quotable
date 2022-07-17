import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import QuoteBox from "../../components/QuoteBox";
import "./Home.css"
import "../../models/Highlight"
import {Highlight} from "../../models/Highlight";

const Home = () => {
    const [highlights, setHighlights] = useState([]);
    const currentUser = useAuth();
    const dbRef = ref(getDatabase());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        get(child(dbRef, `users/${currentUser?.email.split("@")[0]}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    for (const [key1, val1] of Object.entries(Object.values(snapshot.val())[0])) {
                       let info = Object.values(val1);
                       let highlight = new Highlight(info[1], info[0], info[2], key1, info[3]);
                       highlights.push(highlight);
                    }
                    setHighlights(highlights);
                    console.log(highlights);
                }
            }).catch((error) => {
                setError(error.toString());
            });
        setLoading(false);
    }, [currentUser?.email, dbRef]);


    return (
        <div className="home-container">
            <div className="quote-boxes">
                {/*{reverse && !loading &&*/}
                {/*    reverse.map((key) => {*/}
                {/*        const title = key[1]*/}
                {/*        const highlight = key[0].highlight*/}
                {/*        return (*/}
                {/*            <QuoteBox email={currentUser?.email.split("@")[0]} title={title} highlight={highlight} />*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </div>
        </div>
    )
}

export default Home;