import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { ToastContainer } from 'react-toastify'

function MainLayout() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "profile/view", {
                withCredentials: true  // Sends cookies along with the request
            })
            dispatch(addUser(res.data))
        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/login")  // Redirect to login if session expired
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser();  // Fetch user on every reload
    }, [])

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow'>
                <Outlet />
                <ToastContainer autoClose={1000}/>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
