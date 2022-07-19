import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import QuoteBox from "../../components/QuoteBox";
import "./Home.css"
import "../../models/Highlight";
import { Highlight } from "../../models/Highlight";

const Home = () => {
    const [highlights, setHighlights] = useState([]);
    const currentUser = useAuth();
    const [database, setDatabase] = useState(ref(getDatabase()));
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false)


    const queryHighlights = () => {
        setHighlights([])
        if (!toggle) {
            get(child(database, `users/${currentUser?.email.split("@")[0]}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let query = [];
                        for (const [key1, val1] of Object.entries(Object.values(snapshot.val())[0])) {
                            let info = Object.values(val1);
                            let highlight = new Highlight(info[1], info[0], info[2], info[3], info[4], info[5]);
                            query.push(highlight);
                        }
                        setHighlights(query);
                    } else {
                        setHighlights([])
                    }
                }).catch((error) => {
                    setError(error.toString());
                    setHighlights([]);
                });
        } else {
            get(child(database, 'public/'))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let query = [];
                        let values = Object.values(snapshot.val())
                        values.forEach((info) => {
                            info = Object.values(info)
                            let highlight = new Highlight(info[1], info[0], info[2], info[3], info[4], info[5]);
                            query.push(highlight);
                        })
                        setHighlights(query)
                    }
                })



        }
    }

    useEffect(() => {
        setLoading(true);
        queryHighlights();
        setLoading(false);
        console.log(highlights)
    }, [currentUser, database, toggle]);

    return (
        <div className="home-container">
            {currentUser && 
                <>
                    <div className="toggle-visibility-filter">
                        <p className="private-toggle-label">{currentUser?.email.split("@")[0]}</p>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => setToggle(e.target.checked)} />
                        </div>
                        <p className="public-toggle-label">🌐</p>
                    </div>
                    <div className="quote-boxes">
                        {!loading && highlights && !toggle &&
                            highlights.map((obj) => {
                                return (
                                    <QuoteBox data={obj} isPublic={false} />
                                )


                            })
                        }
                        {!loading && highlights && toggle &&
                            highlights.map((obj) => {
                                return (
                                    <QuoteBox data={obj} isPublic={true} />
                                )
                            })
                        }
                        {highlights.length === 0 &&
                            <QuoteBox />
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Home;