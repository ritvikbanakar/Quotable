import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import QuoteBox from "../../components/QuoteBox";
import "./Home.css"


const Home = () => {
    const [books, setBooks] = useState([])
    const currentUser = useAuth();
    const dbRef = ref(getDatabase());
    let bookMap = useRef(new Map())
    let [reverse, setReverse] = useState([])

    useEffect(() => {
        get(child(dbRef, `users/${currentUser?.email.split("@")[0]}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot)
                    setBooks([...books, Object.keys(snapshot.val())])
                    for (const [key1, val1] of Object.entries(snapshot.val())) {
                        let ret = []
                        for (const index of Object.values(val1)) {
                            ret.push(index)
                        }
                        for (const high of ret) {
                            reverse.push([high, key1])

                        }
                        setReverse(reverse)
                        bookMap.current.set(key1, ret)
                    }
                    console.dir(Object.values(snapshot.val()))
                    console.dir(bookMap.current)

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
    }, [currentUser?.email, dbRef, reverse])


    return (
        <div className="home-container">
            <p>this is {currentUser?.email || "stranger"} home page</p>
            <p>User id : {currentUser?.uid || "no UID"}</p>

            <div className="quote-boxes">
                <QuoteBox />
                <QuoteBox />
                <QuoteBox />
                <QuoteBox />
            </div>

            {reverse.map((key) => {
                <p>hi</p>
            })}
        </div>
    )
}

export default Home;