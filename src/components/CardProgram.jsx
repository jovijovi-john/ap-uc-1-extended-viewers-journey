import React from 'react'

import CategoryStripe from "./CategoryStripe"
import PlaceholderProgram from "../assets/EPG/placeholder_program.svg";
import PadlockIcon from "../assets/EPG/padlock.png"

import { generos } from '../configs/generos'

export default function CardProgram({ genero, blocked = false, radiodifusorName }) {

  return (
    <div className={`
    flex flex-col 
    bg-zinc-700 
    max-w-36 h-48 
    rounded-lg ${!radiodifusorName ? "p-2" : ''} 
    relative
    `}
    >

      {blocked &&
        <div className='p-1 rounded bg-zinc-400 absolute right-2 top-2'>
          <img src={PadlockIcon} alt="" />
        </div>
      }

      <div className='flex  flex-1 items-center justify-center'>
        <img src={PlaceholderProgram} alt="" className='w-8/12 mt-4' />
      </div>

      {genero &&
        <div className='w-full mt-auto'>
          <CategoryStripe color={generos[genero]} title={`${genero}`} />
        </div>
      }

      {radiodifusorName &&
        <div className='w-full mt-auto bg-zinc-600 text-white text-center rounded'>
          {radiodifusorName}
        </div>}
    </div>
  )
}
