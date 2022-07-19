import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./Register.css"
import Lottie from "lottie-react";
import checkAnimation from "../../assets/white-check.json";
import { signUp } from "../../firebase";


const Register = () => {

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [matchingError, setMatchingError] = useState(false);

    const handleRegister = async (data) => {
        setLoading(true);
        setMatchingError(false);
        try {
            if (checkMatchingPassword(data.password, data.confirmPassword)) {
                await signUp(data.email, data.password);
                setIsSuccessful(true);
            } else {
                setMatchingError(true);
            }
        } catch (error) {
            alert("Incorrect Credentials!")
            console.log(error)
        }
        setLoading(false);
    }

    const checkMatchingPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    }

    return (
        <div className="register-container">
            {!isSuccessful ?
                <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
                    <h1 className="register-title">Register</h1>
                    <input id="text" {...register("email", { required: true })} 
                        type="email" 
                        placeholder="Email"/>
                    <br/>
                    <input id="text" {...register("password", { required: true })} 
                        type="password" 
                        placeholder="Password"
                        pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                        title="Password must have a minimum of 8 characters, 
                               at least 1 uppercase letter, 
                               1 lowercase letter, 
                               1 number, 
                               and 1 special character."/>
                    <br/>
                    <input id="text" {...register("confirmPassword", { required: true })} 
                        type="password" 
                        placeholder="Confirm Password"/>
                    <br/>
                    {matchingError && <p id="matching-error">Passwords must match. Try again.</p>}
                    <div className="button-wrap">
                        <input disabled={loading} type="submit" id="submit" />
                    </div>
                </form>
                :
                <div className="result-box">
                    <h1>Registered!</h1>
                    <Lottie className="animation" animationData={checkAnimation} loop={false} />
                </div>
            }
        </div>
    )
}

export default Register;