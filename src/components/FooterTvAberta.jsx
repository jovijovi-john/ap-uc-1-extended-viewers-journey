import React from 'react'

import { useNavigate } from "react-router-dom"

import { AiOutlinePicLeft } from "react-icons/ai";
import { FaHome } from "react-icons/fa";

import Footer from "./Footer"
import IconLeftTextRight from "./IconLeftTextRight"
import BorderedIcon from "./BorderedIcon"

export default function FooterTvAberta({ createReference }) {

  const navigate = useNavigate();

  return (
    <Footer classNames={"justify-between items-center"}>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/homepage")}>
        <BorderedIcon color={"white"}>
          <FaHome size={76} />
        </BorderedIcon>
        <p>Home <br />
          Smart Tv
        </p>
      </IconLeftTextRight>

      <div className='mx-16 text-2xl text-zinc-200'>
        <p>Em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), cada radiodifusor solicitará sua permissão para uso dos dados de seu perfil e coleta de outras informações</p>
      </div>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/EPG")}>

        <p>Voltar ao Guia <br />
          da TV aberta</p>

        <BorderedIcon color={"white"}>
          <AiOutlinePicLeft size={76} />
        </BorderedIcon>

      </IconLeftTextRight>

    </Footer>
  )
}
