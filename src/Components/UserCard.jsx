import React from 'react'

function UserCard({ user }) {
    const { firstName, lastName, photoUrl, age, gender, skills, about } = user;
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
                        <button className="btn btn-primary w-[45%]">Ignore</button>
                        <button className="btn btn-secondary w-[45%]">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
