import React from 'react'

export default function RoundedIconWithDescription({ children, onClick }) {
  return (
    <div className='flex flex-col items-center justify-center h-full text-xl gap-2 text-white' onClick={onClick}>
      {children}
    </div>
  )
}
