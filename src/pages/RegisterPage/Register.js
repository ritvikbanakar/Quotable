import React from "react";
import { useForm } from "react-hook-form";
import './Register.css'

const Register = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="register-container">
            <div className="form-container">
                <h1>Register</h1>
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("firstName", { required: true })} 
                    type="text" 
                    placeholder="First Name"/>
                    <input {...register("lastName", { required: true })} 
                    type="text" 
                    placeholder="Last Name"/>
                    <input {...register("login", { required: true })} 
                    type="email" 
                    placeholder="Email"/>
                    <input {...register("password", { required: true })} 
                    type="password" 
                    placeholder="Password"/>
                    <input {...register("confirmPassword", { required: true })} 
                    type="password" 
                    placeholder="Confirm Password"/>
                    <br/>
                    <input type="submit" id="submit" />
                </form>
            </div>
        </div>
    )
}

export default Register;