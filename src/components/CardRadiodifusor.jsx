import React from "react";

export default function CardRadiodifusor({ createReference, classNames, emissora }) {
  return (
    <div
      className={`flex  items-center flex-col gap-10 rounded-xl max-w-sm ${classNames}`}
      tabIndex={0}
      ref={(el) => createReference(el)}
    >
      <img src={emissora.icon} alt="" className="w-2/3 rounded-full min-w-[300px] min-h-[300px] object-cover" />
      <p className="text-5xl font-bold text-gray-200">
        {emissora.name}
      </p>
      <p className="text-2xl text-gray-400">{emissora.slogan}</p>
    </div>
  );
}
