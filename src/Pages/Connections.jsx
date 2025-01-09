import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

function Connections() {
    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connections);
    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connections", { withCredentials: true });
            // console.log(res.data)
            dispatch(addConnections(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getConnections()
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1>No Connections found</h1>
    return (
        <div className='flex flex-col items-center'>
            <h1 className='my-4 text-3xl'>Connections</h1>
            <div className='flex flex-col gap-4 my-4'>
                {connections.map((connection) => {
                    const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;

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
                                {/* <div className="card-actions justify-end">
                        <button className="btn btn-primary">Watch</button>
                    </div> */}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Connections
