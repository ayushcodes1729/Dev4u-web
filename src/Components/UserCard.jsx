import React from 'react'

function UserCard({user}) {
    const {firstName, lastName, photoUrl, age, gender, skills, about} = user;
    return (
        <div>
            <div className="card flex flex-col items-center bg-base-200 w-96 shadow-xl">
                <figure className='w-60'>
                    <img
                        src={photoUrl}
                        alt="photo" />
                </figure>
                <div className="card-body w-full">
                    <h2 className="card-title">{firstName+" "+(lastName && lastName)}</h2>
                    <div className="flex">
                        <span className='bg-base-100'>{age && age}</span>
                        <span className='bg-base-100'>{gender && gender}</span>
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
