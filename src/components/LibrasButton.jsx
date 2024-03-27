import React from 'react'
import IconLeftTextRight from './IconLeftTextRight'
import BorderedIcon from './BorderedIcon'

import LibrasIcon from "../assets/icons/libras.png"

export default function LibrasButton({ createReference = () => { } }) {
  return (
    <IconLeftTextRight createReference={createReference} >
      <BorderedIcon color={"white"}>
        <img src={LibrasIcon} alt="" className='w-20' />
      </BorderedIcon>

      <p>Acessível em Libras</p>
    </IconLeftTextRight>
  )
}
