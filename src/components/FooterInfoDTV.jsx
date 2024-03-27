import React from 'react'
import { useNavigate } from "react-router-dom"

import Footer from './Footer'
import IconLeftTextRight from './IconLeftTextRight'
import BorderedIcon from './BorderedIcon'
import { FaArrowLeft } from "react-icons/fa6";

export default function FooterInfoDTV({ createReference }) {

  const navigate = useNavigate()

  return (
    <Footer>
      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/EPG")}>
        <BorderedIcon color={"white"}>
          <FaArrowLeft size={76} />
        </BorderedIcon>

        <p className='text-left'>
          Voltar ao Guia <br />
          da TV aberta
        </p>
      </IconLeftTextRight>
    </Footer>
  )
}
