import React, { useEffect, useState } from 'react'
import UserCard from '../Components/UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { ArrowLeft, ArrowRight, X, Heart } from 'lucide-react'

const InstructionButton = ({ direction, text }) => {
  const isLeft = direction === 'left'
  
  return (
    <div className={`
      flex items-center gap-3 
      bg-gradient-to-r 
      ${isLeft ? 'from-red-500/80 to-red-600/80' : 'from-green-500/80 to-green-600/80'}
      text-white font-medium
      px-6 py-3 rounded-full
      shadow-lg backdrop-blur-sm
      animate-pulse hover:animate-none
      transition-all duration-300
      border border-white/20
      hover:scale-105
      w-64
    `}>
      {isLeft ? (
        <>
          <X className="w-5 h-5 animate-bounceLeft" />
          <span className="flex-1 text-center">{text}</span>
          <ArrowLeft className="w-5 h-5 animate-bounceLeft" />
        </>
      ) : (
        <>
          <ArrowRight className="w-5 h-5 animate-bounceRight" />
          <span className="flex-1 text-center">{text}</span>
          <Heart className="w-5 h-5 animate-bounceRight" />
        </>
      )}
    </div>
  )
}

function HomePage() {
  const [hiddenButtons, setHiddenButtons] = useState(true)
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const showFeed = async () => {
    const res = await axios.get(BASE_URL + "user/feed", { withCredentials: true })
    dispatch(addFeed(res.data))
  }

  const showbuttons = () => {
    setTimeout(() => {
      setHiddenButtons(false)
    }, 2000)
  }

  useEffect(() => {
    showFeed()
    showbuttons()
  }, [])

  if (!feed) return null

  if (feed.length <= 0) 
    return <h1 className='flex justify-center m-4'>No More users are left</h1>
  
  return (
    <div className='relative h-[80vh] flex justify-center items-center py-4'>
      <style>{`
        @keyframes bounceLeft {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        @keyframes bounceRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounceLeft {
          animation: bounceLeft 2s infinite;
        }
        .animate-bounceRight {
          animation: bounceRight 2s infinite;
        }
      `}</style>
      
      {/* Instructions Container */}
      <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
        {hiddenButtons && (
          <>
            <div className="pointer-events-auto">
              <InstructionButton direction="left" text="Swipe Left to Ignore" />
            </div>
            <div className="pointer-events-auto">
              <InstructionButton direction="right" text="Swipe Right if Interested" />
            </div>
          </>
        )}
      </div>

      {/* Cards */}
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