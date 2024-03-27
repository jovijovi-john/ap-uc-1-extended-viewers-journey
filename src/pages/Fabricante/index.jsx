// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../../components/Page";

export default function Fabricante() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/SelectLanguage");
    }, 6000);
  }, []);

  return (
    <Page>
      <div className="flex-1 w-full flex items-center justify-center">
        <h1 className="text-white font-bold text-9xl">Fabricante</h1>
      </div>
    </Page>
  );
}
