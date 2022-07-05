// import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import './Login.css'

const Login = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const isValid = () => {
            <Link to="/login" />
        }
        isValid();
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("login", { required: true })} 
                    type="email" 
                    placeholder="Email"/>
                    <input {...register("password", { required: true })} 
                    type="password" 
                    placeholder="Password"/>
                    <input type="submit" id="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login;