import React, {useState } from "react";
import { Link } from "react-router-dom";
import showPassimg from '../assets/img/showPass.png'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../assets/scss/login/_login.scss';
import { connect } from "react-redux";
import {login} from "../store/actions";

const Login = ({loginFunc}) => {
    const [showPass, setshowPass] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // navigate('/RegistrEmploy')
        loginFunc(data);
    };

    const switchshowPass = (e) => {
        e.preventDefault();
        setshowPass(!showPass);
    }

    return (
        <>
            <div className="login_section registration_section">
                <div className="custom_container">
                <div className="login_title">Login</div>
                    <div className="login_inner">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="block_inline"></div>
                            <div className={errors?.email?.type === "required" || errors?.email?.type === "pattern" ? "form_block has-error" : "form_block"}  >
                                <input placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                {errors?.email?.type === "pattern" ? <p className="error-info email-info" >invalid Email</p> :
                                    <p className="error-info" >This field is required</p>
                                }
                            </div>
                            <div className={errors?.password?.type === "required" ? "form_block has-error" : "form_block"}  >
                                <input type={showPass ? "password" : "text"} placeholder="Password (8 or more characters)" {...register("password", { required: true, min: 8 })} />
                                <p className="error-info" >This field is required</p>
                                <a href="/#" className="showPass_btn" onClick={(e) => { switchshowPass(e) }} ><img src={showPassimg} alt="show_btn" /></a>
                            </div>
                            <button type="submit" className="submit_btn" >Login</button>
                            <Link to="/registration" className="registr_next_login">Dont have an account ? <span>Create Account</span></Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default Login;
const mapStatetoProps = (state) => {
    return {
        currJwt: state.currJwt,
    }
}

const mapDispatchToProps = {
    loginFunc: login
}


export default connect(mapStatetoProps, mapDispatchToProps)(Login);