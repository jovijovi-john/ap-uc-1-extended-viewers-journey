import React, { useEffect, useState } from 'react'
import RoundedIconWithDescription from './RoundedIconWithDescription'
import RoundedIcon from './RoundedIcon'
import ScaleFocusHover from './ScaleFocusHover'
import { BsChevronRight } from 'react-icons/bs'
import { BiLike } from 'react-icons/bi'
import { emissoras } from '../configs/emissoras'


export default function Relateds({ createReference, }) {

  const [relacionados, setRelacionados] = useState([])

  useEffect(() => {

    setRelacionados(["globo", "sbt", "band", "record", "futura"])


  }, [])

  return (

    < div className="flex w-full gap-16" >

      <RoundedIconWithDescription >
        <RoundedIcon bgColor={"bg-blue-700"} createReference={createReference}>
          <BiLike size={60} className="text-white" />
        </RoundedIcon>
        <p>Relacionados</p>
      </RoundedIconWithDescription>


      <div className="flex items-center gap-8">
        {relacionados.map((emissora, emissoraIndex) => {
          return (
            <ScaleFocusHover
              onClick={() => handleClickEmissora(emissora)}
              createReference={createReference}
              key={emissoraIndex}
              classNames="flex-1 max-h-[150px] w-full h-full rounded-lg overflow-hidden"
            >
              {/* {console.log(emissoras[emissora])} */}
              <img src={emissoras[emissora].icon} alt="" className="h-full w-full object-cover" />;
            </ScaleFocusHover>
          )
        })}
      </div>

      <ScaleFocusHover createReference={createReference} classNames={"flex flex-col items-center justify-center text-white"}>
        <BsChevronRight size={70} />
      </ScaleFocusHover>
    </div >
  )
}
