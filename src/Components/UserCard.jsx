import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user, isTop, style }) => {
    const dispatch = useDispatch();
    const motionValue = useMotionValue(0);
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
    const opacityValue = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [0, 1, 1, 1, 0]
    );
    const controls = useAnimation();

    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user;

    const sendRequest = async (status) => {
        try {
            await axios.post(
                `${BASE_URL}api/request/send/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(_id));
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const handleDragEnd = (_, info) => {
        const threshold = 150;
        if (Math.abs(info.offset.x) < threshold) {
            controls.start({ x: 0 });
        } else {
            const direction = info.offset.x > 0 ? 'interested' : 'ignored';
            sendRequest(direction);
            controls.start({
                x: info.offset.x > 0 ? 200 : -200,
                opacity: 0,
                transition: { duration: 0.3 }
            });
        }
    };

    return (
        <motion.div
            style={{
                ...style,
                x: motionValue,
                rotate: rotateValue,
                opacity: isTop ? opacityValue : style.opacity
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: -1000, right: 1000 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="card bg-base-300 w-80 shadow-xl max-h-[80vh]"
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

                {isTop && (
                    <div className="card-actions justify-between mt-4">
                        <button
                            className="btn btn-primary flex-1 mr-2"
                            onClick={() => sendRequest('ignored')}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-secondary flex-1"
                            onClick={() => sendRequest('interested')}
                        >
                            Interested
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default UserCard;
