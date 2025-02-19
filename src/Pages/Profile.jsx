import React from 'react'
import EditProfile from '../Components/EditProfile'
import UserCard from "../Components/UserCard"
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((store) => store.user);

    if (!user) {
        return <div>Loading...</div>; // Or any other fallback UI
    }

    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user

    return (
        <div className="flex justify-center gap-4 py-6">
            <EditProfile user={user} />
            <div
                className="card bg-base-300 w-80 shadow-xl "
            >
                <figure className="w-full h-64">
                    <img
                        src={photoUrl}
                        alt={`${firstName}'s photo`}
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">
                        {firstName} {lastName}
                    </h2>

                    <div className="flex gap-4">
                        {age && (
                            <span className="bg-base-100 px-2 py-1 rounded-md text-sm">
                                {age} years
                            </span>
                        )}
                        {gender && (
                            <span className="bg-base-100 px-2 py-1 rounded-md text-sm">
                                {gender}
                            </span>
                        )}
                    </div>

                    {about && <p className="text-sm mt-2">{about}</p>}
                </div>
            </div>
        </div>
    );
};


export default Profile
