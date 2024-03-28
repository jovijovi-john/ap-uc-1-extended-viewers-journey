import React from 'react'
import ScaleFocusHover from './ScaleFocusHover'

export default function RoundedIcon({ children, bgColor }) {
  return (
    <div
      className={`${bgColor} w-36 h-36 rounded-full flex items-center justify-center overflow-hidden min-w-36 min-h-36`}
    >
      {children}
    </div>
  )
}
