import React from "react";
import { useNavigate } from "react-router-dom"

import Footer from "./Footer";
import IconLeftTextRight from "./IconLeftTextRight"
import BorderedIcon from "./BorderedIcon"

import { FaArrowLeft } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";

export default function FooterEpg({ createReference }) {

  const navigate = useNavigate();

  return (
    <Footer classNames={"p-4 justify-between"}>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/tvAberta")}>
        <BorderedIcon color={"white"}>
          <FaArrowLeft size={76} />
        </BorderedIcon>

        <p className="text-2xl">
          Voltar aos apps <br />
          de TV aberta
        </p>
      </IconLeftTextRight>

      <IconLeftTextRight createReference={createReference} onClick={() => navigate("/GuiaTvAberta")}>
        <p className="text-2xl text-right">
          Guia de Streaming <br />
          da TV aberta
        </p>

        <BorderedIcon color={"white"}>
          <MdVideoLibrary size={76} />
        </BorderedIcon>

      </IconLeftTextRight>
    </Footer>
  );
}
