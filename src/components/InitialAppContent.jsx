import React from "react";

import Rating from "./Rating";
import VideoPlayer from "./VideoPlayer";
import CardRadiodifusor from "./CardRadiodifusor";

export default function InitialAppContent({ createReference, programa, emissora }) {

  return (
    <main className="bg-zinc-800 w-full flex-1 p-8 rounded-2xl grid grid-cols-[1fr,3fr] gap-4">
      <CardRadiodifusor createReference={createReference} classNames={"justify-center"} emissora={emissora} />

      <div
        className="h-full w-full flex flex-col"
      >

        <VideoPlayer programa={programa} className={"flex-1 max-h-[425px]"} createReference={createReference} />

        <div className="flex gap-4 my-6">
          <div className="text-xl text-white font-medium w-[150px] bg-red-700 px-8 py-[0.25rem] uppercase flex text-center items-center justify-center">
            No Ar
          </div>
          <div className="text-xl text-red-700 font-medium w-[150px] bg-white px-8 py-[0.25rem] uppercase flex text-center items-center justify-center">
            Ao vivo
          </div>
          <div className="text-xl text-white font-medium ml-auto w-[200px] bg-green-700  py-[0.25rem] uppercase flex text-center items-center justify-center">
            Veja do início
          </div>
        </div>

        <div className="flex mb-10">
          <div className="gap-4 min-w-80 flex flex-col text-gray-200 border-r-8 pr-2">
            <h2 className="text-4xl font-bold ">{programa.title}</h2>
            <p className="text-2xl">{programa.startTime} - {programa.endTime}</p>
          </div>
          <div className="text-2xl px-4 text-zinc-300 flex items-center ">
            <p className="line-clamp-4">
              {programa.summary}
            </p>

            <Rating type={programa.rating} className={"ml-4"} />
          </div>
        </div>
      </div>
    </main>
  );
}
