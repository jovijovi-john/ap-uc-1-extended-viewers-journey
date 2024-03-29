import { useNavigate } from "react-router-dom"

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { LuDownload } from "react-icons/lu";

// import RadiodifusorIcon from "../assets/radiodifusor_icon.svg";
import { MdOutlineMonitor } from "react-icons/md";

import { indicacoes } from "../configs/indicacoes";
import ScaleFocusHover from "./ScaleFocusHover";

export default function EPGProgram({ broadcasterIndex, broadcaster, createReference }) {

  const navigate = useNavigate();

  const handleClick = (program) => {
    navigate("/EPG-InfoDTV", {
      state: {
        program,
        broadcasterIndex
      }
    })
  }

  const programs = broadcaster.programs.slice(0, 3)

  return (
    <div className="flex flex-row justify-center align-center h-[200px] rounded-lg w-full ">
      <div className="h-full mx-5 ">
        <ScaleFocusHover
          classNames={"flex items-center justify-center flex-col p-4 rounded-lg"}
          createReference={createReference}
        >
          {/* <MdOutlineMonitor size={120} className="text-zinc-400" /> */}

          <div className="overflow-hidden w-[225px] h-[125px] rounded-lg bg-white">
            <img src={broadcaster.icon} alt="" className="object-cover w-full h-full" />
          </div>

          <span className="text-white text-3xl mt-5">
            {broadcaster.name}
          </span>
        </ScaleFocusHover>
      </div>

      <ScaleFocusHover
        classNames="flex flex-col items-center justify-center  mx-5 rounded-lg"
        createReference={createReference}
        onClick={() => navigate("/EPG-Timeline")}
      >
        <BsChevronLeft size={50} className="text-white cursor-pointer " />
      </ScaleFocusHover>

      <div className="flex flex-1 h-full ">
        {programs.map((program, indexProgram) => {
          return (
            <ScaleFocusHover
              key={indexProgram}
              onClick={() => handleClick(program)}
              createReference={createReference}
              classNames={"flex p-3 bg-zinc-700 rounded-lg mx-5 flex-1 flex-col items-center justify-between w-[400px]"}
            >
              {/* header content */}
              <header className="flex w-full flex-row items-center gap-2 ">
                <img
                  src={indicacoes[program.rating]}
                  className="w-8 h-8"
                  alt=""
                />

                <span className="text-white cursor-default">
                  {program.startTime} - {program.endTime}
                </span>

                {program.isOnAir && (
                  <div className="bg-red-700 text-white py-[0.125rem] px-4 cursor-default">
                    NO AR
                  </div>
                )}

                {program.isLive && (
                  <div className="text-red-600 font-medium ml-auto bg-white px-4 py-[0.125rem] uppercase cursor-default">
                    ao vivo
                  </div>
                )}
              </header>

              <div className="text-2xl font-bold text-zinc-300">
                {program.title}
              </div>


              {program.summary && (
                <span className="text-lg text-zinc-400 mx-2">
                  {program.summary.slice(0, 80)}...
                </span>
              )}

              {/* footer */}
              <footer className="flex w-full flex-row items-center gap-2">

                <AiOutlineStar size={20} fill="#aaa" />

                {program.downloadable && (
                  <LuDownload size={20} className="text-zinc-400 " />
                )}

                {program.advice && (
                  <div className=" cursor-default ml-auto px-3 py-[0.125rem] bg-green-800 text-white font-medium">
                    {program.advice}
                  </div>
                )}
              </footer>

            </ScaleFocusHover>
          );
        })}
      </div>

      <ScaleFocusHover
        createReference={createReference}
        classNames={"flex flex-col items-center justify-center text-white"}
        onClick={() => navigate("/EPG-Timeline")}>
        <BsChevronRight size={50} />
      </ScaleFocusHover>
    </div>
  );
}
