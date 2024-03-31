import React from "react";

import CategoryStripe from "./CategoryStripe";
import Rating from "./Rating";

import FooterProgramEPG from "./FooterProgramEPG";
import { generos } from "../configs/generos";

export default function ProgramEPG({ createReference, programa, broadcasterIndex }) {
  return (
    <main className="bg-zinc-800 w-full p-8 rounded-2xl">
      <div className="grid grid-cols-[3fr,2fr]">
        <div className="flex items-start gap-6">
          <Rating type={programa.rating} />

          <div className="text-white">
            <h4 className="text-4xl font-bold">
              {programa.title}
            </h4>

            <div className="text-2xl">{programa.startTime} - {programa.endTime}</div>

            <div className="mt-4">
              <CategoryStripe color={generos[programa.genre]} title={`${programa.genre}`} />
            </div>

            <p className="text-white text-3xl mt-12 line-clamp-6">
              {programa.summary}
            </p>
          </div>
        </div>

        <div className="w-full flex h-full items-center justify-center overflow-hidden max-h-[400px]">

          <div className="ml-auto h-full w-[600px] rounded-2xl  overflow-hidden">

            {/* <img src={PlaceholderProgram} alt="" className="ml-auto" /> */}
            <img src={programa.banner} alt="" className="w-full h-full  object-cover" />
          </div>
        </div>
      </div>

      <FooterProgramEPG createReference={createReference} programa={programa} broadcasterIndex={broadcasterIndex} />
    </main>
  );
}
