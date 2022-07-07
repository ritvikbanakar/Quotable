import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './Login.css'
import { logIn } from "../../firebase";

const Login = () => {

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    // const [isSuccessful, setIsSuccessful] = useState(false);

    const handleLogIn = async (data) => {
        setLoading(true);
        try {
            await logIn(data.email, data.password);
            // setIsSuccessful(true);
            window.location = "/";
        } catch (error) {
            alert("Incorrect Credentials!")
        }
        setLoading(false);
    } 
    

    return (
        <div className="login-container">
            <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit(handleLogIn)}>
                    <h1 className="login-title">Login</h1>
                    <input id="text" {...register("email", { required: true })} 
                        type="email" 
                        placeholder="Email"/>
                    <br/>
                    <input id="text" {...register("password", { required: true })} 
                        type="password" 
                        placeholder="Password"/>
                    <br/>
                    <div className="button-wrap">
                        <input disabled={loading} type="submit" id="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;