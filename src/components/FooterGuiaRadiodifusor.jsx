import React from 'react'
import { useNavigate } from "react-router-dom"

import Footer from './Footer'

import { FaArrowLeft } from "react-icons/fa6";
import IconLeftTextRight from './IconLeftTextRight';
import BorderedIcon from './BorderedIcon';


export default function GuiaPorGenero({ createReference }) {

  const navigate = useNavigate();

  return (
    <Footer classNames={"text-white justify-between"}>
      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/GuiaTvAberta")}>

        <BorderedIcon color={"white"}>
          <FaArrowLeft size={76} />
        </BorderedIcon>

        <p className='text-left'>Voltar ao Guia de <br />
          Streaming da TV aberta</p>
      </IconLeftTextRight>

    </Footer>
  )
}
