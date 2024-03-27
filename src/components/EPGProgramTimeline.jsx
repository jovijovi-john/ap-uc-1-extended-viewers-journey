import { useNavigate } from "react-router-dom"

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// import RadiodifusorIcon from "../assets/radiodifusor_icon.svg";


import { MdOutlineMonitor } from "react-icons/md";

import ScaleFocusHover from "./ScaleFocusHover";
import ProgramDynamicSize from "./ProgramDynamicSize";

export default function EPGProgramTimeLine({ index, emissora, createReference }) {

  const navigate = useNavigate();

  const handleClick = (program) => {
    navigate("/EPG-InfoDTV", {
      state: {
        program
      }
    })
  }

  const programs = emissora.programs.slice(0, 3)

  return (
    <div></div>
  );
}
