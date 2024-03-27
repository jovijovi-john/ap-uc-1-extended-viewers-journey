import React from 'react'

import CardRadiodifusor from "./CardRadiodifusor.jsx"
import VideoPlayer from "./VideoPlayer.jsx"
import Rating from './Rating.jsx'

export default function ContentRecomendations({ createReference, emissora, programa }) {
  return (
    <div className='flex w-full flex-1 gap-16 px-8'>

      <CardRadiodifusor createReference={createReference} classNames={"justify-center"} emissora={emissora} />

      <VideoPlayer className="flex-1 max-h-[550px]" createReference={createReference} programa={programa} />

      <div className='flex flex-col max-w-[360px] gap-4'>

        <span className='text-xl text-zinc-200'>16:00 - 18:00</span>
        <span className='text-white text-4xl font-semibold'>Titulo do Programa</span>

        <p className='text-2xl text-zinc-300 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo necessitatibus exercitationem enim temporibus, veniam voluptatem, voluptatum aliquam nesciunt nihil quod, quas iusto! Culpa minus doloribus neque maiores, non sequi perferendis!</p>

        <Rating type={"livre"} size={"w-16"} />

      </div>

    </div>
  )
}
