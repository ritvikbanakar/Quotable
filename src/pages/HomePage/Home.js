import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import QuoteBox from "../../components/QuoteBox";
import "./Home.css"


const Home = () => {
    const [books, setBooks] = useState([]);
    const currentUser = useAuth();
    const dbRef = ref(getDatabase());
    let bookMap = useRef(new Map());
    const [reverse, setReverse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        get(child(dbRef, `users/${currentUser?.email.split("@")[0]}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setBooks([...books, Object.keys(snapshot.val())]);
                    for (const [key1, val1] of Object.entries(snapshot.val())) {
                        let ret = [];
                        for (const index of Object.values(val1)) {
                            ret.push(index);
                        }
                        for (const high of ret) {
                            reverse.push([high, key1]);
                        }
                        setReverse(reverse);
                        bookMap.current.set(key1, ret);
                    }
                }
            }).catch((error) => {
                setError(error.toString());
            });
        setLoading(false);
    }, [currentUser?.email, dbRef, reverse]);


    return (
        <div className="home-container">
            <div className="quote-boxes">
                {reverse && !loading &&
                    reverse.map((key) => {
                        const title = key[1]
                        const highlight = key[0].highlight
                        return (
                            <QuoteBox email={currentUser?.email.split("@")[0]} title={title} highlight={highlight} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;