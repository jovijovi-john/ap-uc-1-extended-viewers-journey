import React, { useEffect } from "react";

import { MdKeyboardVoice } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import FocusableElement from "./FocusableElement";
import ScaleFocusHover from "./ScaleFocusHover";

export default function SearchBar({ createReference }) {
  return (
    <div className="flex flex-1 gap-4 max-w-[600px] h-[70px] bg-zinc-700 rounded-md px-8 items-center ">
      <ScaleFocusHover createReference={createReference} classNames={"p-2"}>
        <FaSearch
          size={35}
          className="text-zinc-400 rounded-full cursor-pointer"
        />
      </ScaleFocusHover>

      <input
        type="text"
        className="bg-zinc-700 flex-1 w-full h-full p-2 text-3xl text-zinc-200  outline-none"
        ref={(el) => createReference(el)}
      />

      <ScaleFocusHover createReference={createReference} classNames={"p-2"}>
        <MdKeyboardVoice
          size={35}
          className="text-zinc-400 rounded-full cursor-pointer"
        />
      </ScaleFocusHover>
    </div >
  );
}
