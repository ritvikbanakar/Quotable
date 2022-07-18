import { useEffect, useState } from "react";
import "./QuoteBox.css"
import { getDatabase, ref, child, set, get } from "firebase/database";

const QuoteBox = (props) => {

    const data = props.data

    const handleClick = async (e) => {
        const current = e.target.checked
        if (current) {
            console.log("adding to db")
            addToPublic();
        } else {
            console.log("remove from db")
            removeFromPublic();
        }
    }

    const addToPublic = () => {
        const db = getDatabase();
        set(ref(db, 'public/' + data.hid), {
            "author": data.author,
            "book": data.book,
            "content": data.content,
            "uid": data.uid,
            "username": data.username,
        });
    }

    const removeFromPublic = () => {
        const db = getDatabase();
        set(ref(db, 'public/' + data.hid), null);
    }

    const checkIfPublic = async () => {
        const db = getDatabase();

        get(ref(db, 'public/'))
            .then(snapshot => {
                const keys = new Set(Object.keys(snapshot.val()));
                if (keys.has(data.hid)) {
                    console.log(data.hid)
                    document.getElementById(data.hid).checked = true
                } else {
                    console.log("doesn't exist")
                }
            })
    }

    useEffect(() => {
        console.log("hi")
        checkIfPublic();
    }, []);

    return (
        <>
            <div className="quote-container">
                {
                    <>
                        <p className="name">{data.username}</p>
                        <p className="quote">{data.content}</p>
                        <div className="book-info">
                            <p className="book-title">Title: {data.book}</p>
                            <p className="book-author">Author: {data.author} </p>
                        </div>
                        <div className="show-to-public-checkbox">
                            <input id={data.hid} type="checkbox" onClick={(e) => handleClick(e)} />
                            <p>Public</p>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default QuoteBox