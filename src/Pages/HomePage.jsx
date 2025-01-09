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
    // console.log(res.data);
  }

  useEffect(() => {
    showFeed()
  }, [])

  if (!feed) return;

  if (feed.length <= 0) return <h1 className='flex justify-center m-4'>No More users are left</h1>
  return feed && (
    <div className='flex justify-center items-center py-4'>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default HomePage
