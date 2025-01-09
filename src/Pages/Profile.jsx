import React from 'react'
import EditProfile from '../Components/EditProfile'
import UserCard from "../Components/UserCard"
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((store) => store.user);

    if (!user) {
        return <div>Loading...</div>; // Or any other fallback UI
    }

    return (
        <div className="flex justify-center gap-4 py-6">
            <EditProfile user={user} />
            <UserCard user={user} />
        </div>
    );
};


export default Profile
