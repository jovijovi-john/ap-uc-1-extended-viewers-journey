import React from 'react'
import RadiodifusorCard from './RadiodifusorCard'

export default function RecomendationsBar({ recomendations, createReference }) {

  return (
    <div className='overflow-x-scroll w-full '>
      <div className='p-4 h-56 flex items-center gap-4 mt-4 overflow-y-hidden'>
        {recomendations.map((recomendation, index) => {
          return (
            <RadiodifusorCard
              classNames={"h-full w-[350px]"}
              createReference={createReference}
              key={index}
              icon={recomendation.icon}
            />
          )
        })}
      </div>
    </div>
  )
}
