import { useEffect, useState } from "react";
import "./QuoteBox.css"
import { useAuth } from '../firebase';
import { getDatabase, ref, child, set, get } from "firebase/database";

const QuoteBox = (props) => {

    const data = props.data || null
    const currentUser = useAuth();

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
        console.log(data)
        set(ref(db, 'public/' + data.hid), {
            "author": data.author,
            "book": data.book,
            "content": data.content,
            "uid": data.uid,
            "username": data.username,
            "hid": data.hid,
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
                if (snapshot.val()) {
                    const keys = new Set(Object.keys(snapshot.val()));
                    if (keys.has(data.hid.toString())) {
                        document.getElementById(data.hid).checked = true
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (data) {
            checkIfPublic();
        }
    }, []);

    useEffect(() => {

    }, [removeFromPublic])

    return (
        
        <>
            {currentUser &&
                <div className="quote-container">
                    <>  
                        {data &&
                            <>
                                {props.isPublic &&
                                    <p className="name">{data.username}</p>
                                }
                                <p className="quote">{data.content}</p>
                                <div className="book-info">
                                    <p className="book-title">Title: {data.book}</p>
                                    <p className="book-author">Author: {data.author} </p>
                                </div>
                                {!props.isPublic &&
                                    <div className="show-to-public-checkbox">
                                        <input className="public-checkbox" id={data.hid} type="checkbox" onClick={(e) => handleClick(e)} />
                                        <p>Public</p>
                                    </div>
                                }
                            </>
                        }
                        {currentUser && !data && 
                            <p>Nothing to see here!</p>
                        }
                    </>
                </div>
            }
        </>
    )
}

export default QuoteBox