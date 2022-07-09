import React from "react";
import { useAuth } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

var books = []
var quotes = []

function readQuotes(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
            books.push(child.key)
            console.log(books)
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}


const Home = () => {
    const currentUser = useAuth();
    readQuotes(currentUser?.email.split("@")[0])
   
    return (
        <p>this is {currentUser?.email || "stranger"} home page</p>
    )
}

export default Home;