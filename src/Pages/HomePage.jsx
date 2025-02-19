import React, { useEffect } from 'react'
import UserCard from '../Components/UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

function HomePage() {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const showFeed = async () => {
    const res = await axios.get(BASE_URL + "user/feed", { withCredentials: true })
    dispatch(addFeed(res.data))
  }

  useEffect(() => {
    showFeed()
  }, [])

  if (!feed) return null;

  if (feed.length <= 0) return <h1 className='flex justify-center m-4'>No More users are left</h1>
  
  return (
    <div className='relative h-[80vh] flex justify-center items-center py-4'>
      {feed.map((user, index) => (
        <UserCard 
          key={user._id} 
          user={user} 
          isTop={index === 0}
          style={{
            position: 'absolute',
            zIndex: feed.length - index,
            opacity: index === 0 ? 1 : 0.8,
            scale: `${1 - index * 0.05}`,
            top: `${index * 10}px`
          }}
        />
      ))}
    </div>
  )
}

export default HomePage