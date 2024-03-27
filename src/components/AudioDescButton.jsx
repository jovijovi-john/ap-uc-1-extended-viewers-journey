import React from 'react'
import IconLeftTextRight from './IconLeftTextRight'
import BorderedIcon from './BorderedIcon'

import AudiodescIcon from "../assets/icons/audiodescricao.png"

export default function AudioDescButton({ createReference = () => { } }) {
  return (
    <IconLeftTextRight createReference={createReference} >
      <BorderedIcon color={"white"}>
        <img src={AudiodescIcon} alt="" className='w-20' />
      </BorderedIcon>

      <p>Audiodescrição</p>
    </IconLeftTextRight >
  )
}
