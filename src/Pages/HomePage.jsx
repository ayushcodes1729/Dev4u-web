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
  return feed && (
    <div className='flex justify-center items-center py-4'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default HomePage
