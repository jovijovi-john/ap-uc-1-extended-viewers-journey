import React from 'react'
import Footer from './Footer'
import IconLeftTextRight from './IconLeftTextRight'

import { BsGear } from "react-icons/bs";
import BorderedIcon from './BorderedIcon';

export default function FooterHomepage({ createReference }) {
  return (
    <Footer classNames={"text-white"}>
      <IconLeftTextRight createReference={createReference}>
        <BorderedIcon color={"white"}>
          <BsGear size={76} />
        </BorderedIcon>
        <p className='text-left'>Configurações da<br />
          SmartTV</p>
      </IconLeftTextRight>
    </Footer>
  )
}
