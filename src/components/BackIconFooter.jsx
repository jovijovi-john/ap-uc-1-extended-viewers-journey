import React from "react";

import { FaArrowLeft } from "react-icons/fa6";

export default function BackIconFooter({ createReference, children }) {
  return (
    <div
      tabIndex={0}
      ref={(el) => createReference(el)}
      className="flex items-center gap-4 text-white p-4"
    >
      <div className=" border border-white  rounded-lg p-2">
        <FaArrowLeft size={60} />
      </div>

      {children ? (
        <span className="text-2xl">{children}</span>
      ) : (
        <span className="text-2xl">
          Voltar aos apps <br /> de TV aberta
        </span>
      )}
    </div>
  );
}
