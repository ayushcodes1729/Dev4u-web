import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

function UserCard({ user }) {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user;
    const sendRequest = async (status, userId)=>{
        try {
            const res = await axios.post(BASE_URL+"api/request/send/"+ status + "/" + userId, {}, {withCredentials: true});
            // console.log(res)
            dispatch(removeUserFromFeed(_id))
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <div className=''>
            <div className="card flex flex-col items-center bg-base-300 max-h-[80vh] w-80 shadow-xl">
                <figure className='w-full h-64'>
                    <img
                        className='w-full h-full object-contain'
                        src={photoUrl}
                        alt="photo" />

                </figure>

                <div className="card-body w-full">
                    <h2 className="card-title">{firstName + " " + (lastName && lastName)}</h2>
                    <div className="flex gap-4">
                        {age && <span className='bg-base-100 px-2 rounded-md'>{age}</span>}
                        {gender && <span className='bg-base-100 px-2 rounded-md'>{gender}</span>}
                    </div>
                    <p>{about && about}</p>
                    <div className="card-actions flex justify-center">
                        <button className="btn btn-primary w-[45%]" onClick={()=>sendRequest("ignored", _id )}>Ignore</button>
                        <button className="btn btn-secondary w-[45%]" onClick={()=>sendRequest("interested", _id )}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
