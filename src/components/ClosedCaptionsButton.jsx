import React from 'react'
import IconLeftTextRight from './IconLeftTextRight'
import BorderedIcon from './BorderedIcon'

import ClosedCaptions from "../assets/icons/legenda_oculta.svg"

export default function ClosedCapitonsButton({ createReference = () => { } }) {
  return (
    <IconLeftTextRight createReference={createReference} >
      <BorderedIcon color={"white"} className={'h-full'}>
        <img src={ClosedCaptions} alt="" className='w-20 h-full' />
      </BorderedIcon>

      <p>Audiodescrição</p>
    </IconLeftTextRight >
  )
}
