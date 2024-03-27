import React from 'react'
import { useNavigate } from "react-router-dom"

import Footer from './Footer'
import Listing from "../assets/icons/listing.png"

import { FaArrowLeft } from "react-icons/fa6";
import IconLeftTextRight from './IconLeftTextRight';
import BorderedIcon from './BorderedIcon';


export default function FooterGuiaPorEmissora({ createReference }) {

  const navigate = useNavigate();

  return (
    <Footer classNames={"text-white justify-between"}>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/EPG")}>
        <BorderedIcon color={"white"}>
          <FaArrowLeft size={76} />
        </BorderedIcon>

        <p>Voltar ao Guia <br />
          da TV aberta</p>
      </IconLeftTextRight>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/GuiaPorGenero")}>
        <p className='text-right' >Listagem por <br />
          Categoria</p>

        <BorderedIcon color={"white"}>
          <img src={Listing} alt="" />
        </BorderedIcon>
      </IconLeftTextRight>

    </Footer>
  )
}
