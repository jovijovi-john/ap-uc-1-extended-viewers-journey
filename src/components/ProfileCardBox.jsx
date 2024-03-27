import React from 'react'
import ScaleFocusHover from './ScaleFocusHover'

export default function ProfileCardBox({ createReference, children, onClick = () => { } }) {
  return (
    <ScaleFocusHover
      createReference={createReference}
      onClick={onClick}
      classNames={
        `
        border-2 border-zinc-400 
        flex flex-col items-center justify-center gap-12 
        text-2xl font-semibold text-white 
        w-[500px] h-[400px] rounded-xl
        bg-neutral-900
        hover:bg-neutral-800
        focus:bg-neutral-800
        `
      }>
      {children}
    </ScaleFocusHover>
  )
}
