import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "login", {
                emailId,
                password
            }, {
                withCredentials: true
            })
            dispatch(addUser(res.data.user))
            return navigate("/")
        } catch (error) {
            setError(error?.response?.data || "Something Went Wrong");
            // console.log(error)
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "signup", {
                firstName,
                lastName,
                emailId,
                password
            }, {withCredentials: true})
            dispatch(addUser(res.data.data))
            return navigate("/profile")
        } catch (error) {
            setError(error?.response?.data || "Something Went Wrong");
        }
    }
    return (
        <div className='flex justify-center py-10'>
            <div className="card bg-base-200 w-80 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
                    <div className='flex flex-col  py-4'>
                        {!isLogin &&<>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name:</span>
                                </div>
                                <input type="text" name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Last Name:</span>
                                </div>
                                <input type="text" name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                            </label>
                        </>}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input type="email" name='email' value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password:</span>
                            </div>
                            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <p className='text-red-600'>{error}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignup}>{isLogin ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className='text-white cursor-pointer' onClick={() => setIsLogin((value) => !value)}>{isLogin ? "New User ? Sign Up" : "Already a user ?"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login
