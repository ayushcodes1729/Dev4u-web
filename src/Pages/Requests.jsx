import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addrequests, removeRequest } from '../utils/requestsSlice';

function Requests() {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true });
            // console.log(res.data.userRequests);
            dispatch(addrequests(res.data.userRequests))
        } catch (error) {
            console.log(error)
        }
    }

    const reviewRequest = async(status, _id)=>{
        const res = axios.post(BASE_URL + "api/request/review/" + status + "/" + _id, {}, {withCredentials: true});

        dispatch(removeRequest(_id))

    }

    useEffect(()=>{
        fetchRequests()
    }, [])

    if (!requests) return;

    if (requests.length === 0) return <h1>No Requests found</h1>
    return (
        <div className='flex flex-col items-center'>
            <h1 className='my-4 text-3xl'>Requests</h1>
            <div className='flex flex-col gap-4 my-4'>
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                    return (
                        <div key={_id} className="card card-side bg-base-300 shadow-xl p-4">
                            <figure className='w-40'>
                                <img
                                    src={photoUrl}
                                    alt="photo" />
                            </figure>
                            <div className="card-body ">
                                <h2 className="card-title ">{firstName + " " + lastName}</h2>
                                <div className='flex gap-2'>
                                    {age && (
                                        <span className='bg-base-100 rounded-lg w-fit px-2'>{age}</span>
                                    )}
                                    {gender && (
                                        <span className='bg-base-100 rounded-lg w-fit px-2'>{gender}</span>
                                    )}
                                </div>
                                <p>{about}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                                    <button className="btn btn-secondary" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
export default Requests
