import React from 'react'
import { useNavigate } from "react-router-dom"

// Icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";

// Components
import ScaleFocusHover from './ScaleFocusHover';
import Rating from './Rating';
import CategoryStripe from './CategoryStripe';

import { indicacoes } from "../configs/indicacoes";

export default function ProgramDynamicSize({ onClick, programa, createReference }) {

  function calculateWidth() {

    const widthPerHour = 400

    let startHour = Number(programa.startTime.slice(0, 2));
    let startMinutes = Number(programa.startTime.slice(3, 5));

    let endHour = Number(programa.endTime.slice(0, 2));
    let endMinutes = Number(programa.endTime.slice(3, 5));

    let startTime = (startHour + (startMinutes / 60)) * widthPerHour
    let endTime = (endHour + (endMinutes / 60)) * widthPerHour

    let totalTime = endTime - startTime

    return totalTime
  }

  const navigate = useNavigate();

  const handleClick = (program) => {
    navigate("/EPG-InfoDTV", {
      state: {
        program
      }
    })
  }

  return (
    <ScaleFocusHover
      onClick={() => handleClick(programa)}
      createReference={createReference}
      classNames={"flex p-3 bg-zinc-700 rounded-lg flex-col overflow-hidden items-center justify-between border-2 border-zinc-800 shrink-0"}
      style={{
        width: calculateWidth()
      }}

    >
      <header className='w-full flex items-center gap-2'>
        <Rating type={programa.rating} size={"w-[36px]"} />

        {programa.isOnAir ?
          <CategoryStripe color={"darkRed"} title={"No Ar"} />
          : <p className='text-md text-zinc-300'>{programa.startTime} : {programa.endTime}</p>
        }

        {programa.isLive &&
          <CategoryStripe className={"ml-auto"} textColor={"text-red-700"} color={"white"} title={"AO VIVO"} />
        }
      </header>

      <main className='flex-1  flex items-center justify-center flex-col gap-2 w-full'>
        <p className='line-clamp-1 text-2xl text-zinc-100 font-bold'>{programa.title}</p>
        <p className='line-clamp-2 text-lg text-zinc-400 text-center'>{programa.summary}</p>
      </main>

      <footer className='mt-auto w-full flex justify-between items-center '>
        <div className='icons flex justify-start gap-2 '>
          <AiOutlineStar className='text-zinc-400' size={24} />

          {programa.downloadable &&
            <LuDownload className='text-zinc-400' size={24} />
          }
        </div>

        {programa.advice &&
          <CategoryStripe title={programa.advice} color={"darkGreen"} className={"text-[14px] px-2 overflow-hidden"} />
        }
      </footer>

    </ScaleFocusHover >
  )
}
