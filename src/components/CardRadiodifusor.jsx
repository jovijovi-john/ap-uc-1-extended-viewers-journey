import React from "react";

export default function CardRadiodifusor({ createReference, classNames, emissora }) {
  return (
    <div
      className={`flex  items-center flex-col gap-10 rounded-xl max-w-sm ${classNames}`}
      tabIndex={0}
      ref={(el) => createReference(el)}
    >
      <div className="w-[300px] h-[300px] flex">
        <img src={emissora.icon} alt="" className="w-full h-full object-cover rounded-full bg-white" />

      </div>
      <p className="text-5xl font-bold text-gray-200">
        {emissora.name}
      </p>
      <p className="text-2xl text-gray-400">{emissora.slogan}</p>
    </div>
  );
}
