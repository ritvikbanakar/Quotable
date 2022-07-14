import React, {useEffect, useRef, useState} from "react";
import { useAuth } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import Card from '@mui/material/Card';
import {Button, CardActions, CardContent, Typography} from "@mui/material";

const Home = () => {
    const[books, setBooks] = useState([])
    const currentUser = useAuth();
    const dbRef = ref(getDatabase());
    // Book: Highlights
    // String: Array[String]
    let bookMap = useRef(new Map())
    // Reverse required to have the cards by quotes rather than by book
    let [reverse,setReverse] = useState([])
    useEffect(()=> {
        get(child(dbRef, `users/${currentUser?.email.split("@")[0]}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setBooks([...books, Object.keys(snapshot.val())])
                for(const [key1, val1] of Object.entries(snapshot.val())){
                    let ret = []
                   for(const index of Object.values(val1)){
                       ret.push(index)
                   }
                   for(const high of ret){
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
      <div className="App">
          {
           reverse.map((key)=> {
                return (
                    <Card key ={key[1]+"-"+key[0].highlight} sx={{ minWidth: 275, margin:"15px" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {key[1]+""}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {key[0].highlight}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={(e)=>{
                                window.alert("pressed" + e.target)
                            }}>Learn Less</Button>
                        </CardActions>
                    </Card>
                )
            })
        }
      </div>
    );
  }

export default Home;