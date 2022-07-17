import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Upload.css"
import Lottie from "lottie-react";
import checkAnimation from "../../assets/white-check.json";
import { useAuth } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

const Upload = () => {
    function hashCode(s) {
        let h=0;
        for(let i = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;

        return h;
    }

    const writeQuotes = (userId, book, highlight, author) => {
        const db = getDatabase();
        let hid = hashCode(highlight)
        set(ref(db, 'users/' + userId + '/highlights/' + hid), {
            "author": author,
            "book": book,
            "content": highlight,
            "uid": userId,
        });
    }

    const currentUser = useAuth();

    const verifyUser = (user) => {
        if (user === null) {
            window.location = "/";
        }
    }

    verifyUser(currentUser);

    const { register, handleSubmit } = useForm();

    // status of submission
    const [status, setStatus] = useState(false);

    const onSubmit = (data) => {
        setStatus(true);
        handleFile(data.file)
    }

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (file) => {
            let lines = file.target.result.split(/\r?\n/)
            for (let i = 0; i < lines.length - 1; i += 5) {
                // Splitting Book Title and Author
                let split = lines[i].split("(");
                let author = split[1].replace(")", '')
                let book = split[0].trim()
                let highlight = lines[i + 3]
                writeQuotes(currentUser?.email.split("@")[0], book, highlight, author)
            }
        }
        reader.readAsText(file[0])
    }

    return (
        <div className="upload-container">
            {!status && currentUser ?
                <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="upload-title">Upload</h1>
                    <input id="text" {...register("firstName", { required: true })}
                        type="text"
                        placeholder="First Name" />
                    <br />
                    <input id="text" {...register("lastName", { required: true })}
                        type="text"
                        placeholder="Last Name" />
                    <br />
                    <input id="text" {...register("displayName", { required: true })}
                        type="text"
                        placeholder="Display Name" />
                    <br />
                    <input {...register("file", { required: true })}
                        type="file"
                        accept=".txt" />
                    <br />
                    <div className="button-wrap">
                        <input type="submit" id="submit" />
                    </div>
                </form>
                :
                <div className="result-box">
                    <h1>Uploaded!</h1>
                    <Lottie className="animation" animationData={checkAnimation} loop={false} />
                </div>
            }
        </div>
    )
}

export default Upload;