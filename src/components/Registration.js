import React, {useState } from "react";
import { Link } from "react-router-dom";
import showPassimg from '../assets/img/showPass.png'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../assets/scss/login/_login.scss'
import { connect } from "react-redux";
import {registration} from "../store/actions";


const Registration = ({currJwt, registration}) => {
    const [showPass, setshowPass] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        navigate('/login')
        // console.log(data);
        registration(data);
        // console.log(currJwt);
    };

    const switchshowPass = (e) => {
        e.preventDefault();
        setshowPass(!showPass);
    }

    return (
        <>
            <div className="login_section registration_section">
                <div className="custom_container">
                <div className="login_title">Registration</div>
                    <div className="login_inner">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="block_inline">
                                <div className={errors?.name?.type === "required" ? "form_block has-error" : "form_block"}  >
                                    <input placeholder="First Name" {...register("name", { required: true })} />
                                    <p className="error-info" >This field is required</p>
                                </div>
                                <div className={errors?.surname?.type === "required" ? "form_block has-error" : "form_block"}  >
                                    <input placeholder="Last Name" {...register("surname", { required: true })} />
                                    <p className="error-info" >This field is required</p>
                                </div>
                            </div>
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
                            <div className={errors?.checkbox2?.type === "required" ? "checkbox_block has-error" : "checkbox_block"} >
                                <label>
                                    <input type="checkbox" {...register("checkbox2", { required: true })} />
                                    <span className="checkbox_line icon-down"></span>
                                    <p className="checkbox_info">I agree to the <span>ToDoTerms of Service</span></p>
                                </label>
                                <p className="error-info" >This field is required</p>
                            </div>
                            <button type="submit" className="submit_btn" >Create my account</button>
                            <Link to="/login" className="registr_next_login">Already have an account ? <span>Log In</span></Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default Registration;

const mapStatetoProps = (state) => {
    return {
        currJwt: state.currJwt,
    }
}

const mapDispatchToProps = {
    registration: registration
}


export default connect(mapStatetoProps, mapDispatchToProps)(Registration);