import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';

function EditProfile({ user }) {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age ? user?.age : "");
    const [gender, setGender] = useState(user.gender ? user?.gender : "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);

    const [error, setError] = useState("");


    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about
            }, { withCredentials: true });
            // console.log(res)
            dispatch(addUser(res?.data?.data))
            toast.success("Profile Updated successfully")
        } catch (error) {
            setError(error?.response?.data || "Something Went Wrong");
            // console.log(error);
        }
    }
    return (
        <label className="card form-control w-full max-w-xs bg-base-200 p-4 gap-4">
            <h1 className='text-center text-white text-lg'>Edit profile</h1>
            <input type="text" placeholder="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} name='firstName' className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} name='lastName' className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} name='age' className="input input-bordered w-full max-w-xs" />
            <select name='gender' value={gender} onChange={(e) => setGender(e.target.value)} className="select select-bordered w-full max-w-xs">
                <option disabled>Gender</option>
                <option>M</option>
                <option>F</option>
                <option>Others</option>
            </select>
            <input type="text" placeholder="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} name='photoUrl' className="input input-bordered w-full max-w-xs" />
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} name="about" id="about" placeholder='Tell us about Yourself' className='p-2 flex-grow'></textarea>
            <p className='text-red-500'>{error}</p>
            <button className="btn btn-outline btn-accent" onClick={saveProfile}>Save Profile</button>
        </label>
    )
}

export default EditProfile
