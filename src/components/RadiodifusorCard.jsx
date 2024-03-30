import React from 'react'
import ScaleFocusHover from './ScaleFocusHover'

export default function RadiodifusorCard({ classNames, icon, createReference, onClick = () => { } }) {
  return (
    <ScaleFocusHover
      createReference={createReference}
      classNames={`shrink-0 rounded-3xl overflow-hidden bg-white ${classNames}`}
      onClick={onClick}
    >
      <img src={icon} alt="" className='object-cover w-full h-full' />
    </ScaleFocusHover>
  )
}
