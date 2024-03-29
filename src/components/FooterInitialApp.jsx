import React from "react";

import { useNavigate } from "react-router-dom"

import BorderedIcon from "./BorderedIcon";
import IconLeftTextRight from "./IconLeftTextRight";
import Footer from "./Footer";

import { AiOutlinePicLeft } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa6";

export default function FooterInitialApp({ createReference }) {

  const navigate = useNavigate();

  return (
    <Footer classNames={"p-4 justify-between text-white"}>
      <div className="flex space-between items-center">
        <IconLeftTextRight createReference={createReference} onClick={() => navigate("/tvAberta")}>
          <BorderedIcon color={"white"}>
            <BsChevronLeft size={76} />
          </BorderedIcon>

          <p className="text-left">
            Voltar aos apps <br />
            de tv aberta
          </p>
        </IconLeftTextRight>

        <IconLeftTextRight createReference={createReference}>
          <BorderedIcon color={"#ffd000"}>
            <FaRegStar size={76} />
          </BorderedIcon>

          <p className="text-left">
            Adicionar <br /> aos favoritos
          </p>
        </IconLeftTextRight>
      </div>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/EPG")}>

        <p className="text-right">Abrir o guia <br />
          da TV Aberta</p>
        <BorderedIcon color={"white"}>
          <AiOutlinePicLeft size={76} />
        </BorderedIcon>

      </IconLeftTextRight>
    </Footer>
  );
}
