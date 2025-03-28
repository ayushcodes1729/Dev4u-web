import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Links, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

function Navbar() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() =>{
        try {
            await axios.post(BASE_URL+"logout",{},{withCredentials:true});
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Dev4u</Link>
            </div>
            {
                user &&
                (<div className="flex-none gap-2">
                    <p>Welcome, {user.firstName}</p>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="mx-4 btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile"  className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections </Link></li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><Link onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Navbar
