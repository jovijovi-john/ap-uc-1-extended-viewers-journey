import React, { useRef, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"

import Page from "../../components/Page";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import FooterHomepage from "../../components/FooterHomepage";
import Relateds from "../../components/Relateds.jsx";

import RoundedIconWithDescription from "../../components/RoundedIconWithDescription";
import RoundedIcon from "../../components/RoundedIcon";
import ScaleFocusHover from "../../components/ScaleFocusHover";

import { MdOutlineMonitor } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import { BiLike } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";

import NeflixIconRounded from "../../assets/apps/netflix_rounded.svg"

import { emissoras } from "../../configs/emissoras";
import { apps, netflixContent } from "../../configs/apps.js";
import { setDataToStreamingLocalStorage } from "../../utils/dataStreaming.js";

import keyMapping from "./keyMapping"

export default function Homepage() {

  const emissorasValues = Object.values(emissoras)
  const tvAberta = emissorasValues.slice(0, 5);
  const appsValues = Object.values(apps).slice(0, 4)

  const [elementFocusable, setElementFocusable] = useState();

  // Array de refs
  const refs = useRef([]);
  const refTeste = useRef();

  const refsRelated = useRef([]);

  // Utilizado para navegar entre as rotas da aplicação
  const navigate = useNavigate();

  // Variável para rastrear a div com foco
  let focusIndex = 0;

  // Acionado quando um elemento do array de referências é focado
  function handleFocus(el) {
    if (el) {
      // Tem que converter pra número, porque o id vem como string
      // Assim previnirá erros de "8" + 1 == 81
      focusIndex = Number(el.id);
      console.log(focusIndex)
    }
  }

  // Função para gerenciar eventos do teclado e mapeá-los para a função handleFocusElement
  function handleKeyDown(key) {
    if (!keyMapping[key.code]) {
      return handleFocusElement(key);
    }

    return navigate(`/${keyMapping[key.code]}`);
  }

  // Função utilizada para navegação pelo teclado
  function handleKeyDown(key) {
    if (!keyMapping[key.code]) {
      return handleFocusElement(key);
    }

    return navigate(`/${keyMapping[key.code]}`);
  }

  // Função utilizada para navegação pelo teclado
  function handleFocusElement(keyPressed, keysFunctions) {
    if (!keysFunctions) {
      keysFunctions = {
        ArrowUp: -6,
        ArrowDown: 6,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus = focusIndex + keysFunctions[keyPressed.code];

      if (newFocus < 0) {
        newFocus = 0;
      } else if (newFocus >= refs.current.length) {
        newFocus = refs.current.length - 1;
      }

      refs.current[newFocus].focus();
    }
  }

  // Função utilizada para criar uma referência do elemento
  function createReference(el) {
    // Atualmente, ela conta quantos elementos têm no array de refs, e coloca o elemento na ultima posição com o id == len(refs)

    if (el) {

      if (!el.id) {
        el.id = refs.current.length;
        el.onfocus = () => handleFocus(el);
        refs.current.push(el);
      }
    }
  }


  // Acionado quando o componente for renderizado pela primeira vez
  useEffect(() => {
    // Focando o primeiro elemento assim que a tela carregar
    if (refs.current) {
      refs.current[0].focus();
    }

    // Adicionando o listener do teclado
    window.onkeydown = handleKeyDown;
  }, []);

  const [relacionados, setRelacionados] = useState(["sbt", "globo", "band", "record", "futura"]);

  function createReferenceForRelated(el) {
    if (el) {
      el.id = refs.current.length;
      el.onfocus = () => {
        handleFocus(el)
        changeRelated(el)
      };

      refs.current.push(el);
      refsRelated.current.push(el);
    }
  }


  function changeRelated(el) {

    const classNames = refs.current[el.id].className

    const regex = /emissora-\S+/;

    // Usa o método match para encontrar a correspondência
    const match = classNames.match(regex);

    if (match) {
      const emissora = match[0].replace("emissora-", "")

      localStorage.setItem("relacionados", emissoras[emissora].related)

    }
    console.log(refs.current[el.id])


  }

  function handleClickEmissora(emissora, emissoraIndex) {

    setDataToStreamingLocalStorage(emissoraIndex)

    navigate("/InitialApp")
  }

  function handleClickApp(app) {
    // navigate("/InitialApp", {
    //   state: {
    //     programa: app.programs[app.initialContent],
    //     emissora: app
    //   }
    // })

    return
  }

  return <Page>

    <Header title="">
      <Profile createReference={createReference} />
    </Header>

    <main className="h-full w-full rounded-lg pl-44 flex flex-col justify-around">

      {/* --------------------------------------- APLICATIVOS ---------------------------------------------------- */}
      <div className="flex w-full gap-16">

        <RoundedIconWithDescription>
          <RoundedIcon bgColor={"bg-violet-600"} createReference={createReferenceForRelated}>
            <TbGridDots size={60} className="text-white" />
          </RoundedIcon>

          <p>
            Aplicativos
          </p>
        </RoundedIconWithDescription>

        <div className="flex items-center gap-8">
          <ScaleFocusHover
            createReference={createReference}
            classNames={`flex flex-col justify-center items-center gap-2 max-h-[150px]  h-full rounded-lg overflow-hidden bg-red-700 w-[242px]`}
            onClick={() => navigate("/tvAberta")}
          >
            <MdOutlineMonitor size={76} className="text-white" />
            <p className="text-xl text-white font-semibold">Tv Aberta</p>
          </ScaleFocusHover>

          {appsValues.map((app, appIndex) => {
            return <ScaleFocusHover
              onClick={() => handleClickApp(app)}
              createReference={createReferenceForRelated}
              key={appIndex}
              classNames=" max-h-[150px] w-[242px] h-full rounded-lg overflow-hidden w-[242px]">

              <img src={app.icon} alt="" className="h-full w-full object-cover" />
            </ScaleFocusHover>
          })}
        </div>

        <ScaleFocusHover
          createReference={createReference}
          classNames={"flex flex-col items-center justify-center text-white"}
          onClick={() => navigate("/apps")}
        >
          <BsChevronRight size={70} />
        </ScaleFocusHover>
      </div>

      {/* --------------------------------------- EMISSORAS ---------------------------------------------------- */}
      <div className="flex w-full gap-16">

        <RoundedIconWithDescription>
          <RoundedIcon bgColor={"bg-red-700"}>
            <MdOutlineMonitor size={60} className="text-white" />
          </RoundedIcon>

          <p>Tv Aberta</p>
        </RoundedIconWithDescription>

        <div className="flex items-center gap-8">
          {tvAberta.map((emissora, emissoraIndex) => {
            return (
              <ScaleFocusHover
                onClick={() => handleClickEmissora(emissora, emissoraIndex)}
                createReference={createReferenceForRelated}
                key={emissoraIndex}
                classNames={`max-h-[150px] bg-white h-full rounded-lg overflow-hidden w-[242px]`}>

                <img src={emissora.icon} alt="" className="h-full w-full object-cover" />
              </ScaleFocusHover>
            )
          })}
        </div>

        <ScaleFocusHover
          createReference={createReference}
          classNames={"flex flex-col items-center justify-center text-white"}
          onClick={() => navigate("/tvAberta")}>
          <BsChevronRight size={70} />
        </ScaleFocusHover>
      </div>

      {/* --------------------------------------- RELACIONADOS ---------------------------------------------------- */}
      <div className="flex w-full gap-16">

        <RoundedIconWithDescription >
          <RoundedIcon createReference={createReference}>
            <img src={NeflixIconRounded} alt="" />
          </RoundedIcon>
          <p>Relacionados</p>
        </RoundedIconWithDescription>

        <div className="flex items-center gap-8">
          {netflixContent.map((emissora, emissoraIndex) => {
            return (
              <ScaleFocusHover
                // onClick={() => handleClickEmissora(emissora, emissoraIndex)}
                createReference={createReferenceForRelated}
                key={emissoraIndex}
                classNames={`max-h-[150px] h-full rounded-lg overflow-hidden w-[242px]`}>

                <img src={emissora.icon} alt="" className="h-full w-full object-cover" />
              </ScaleFocusHover>
            )
          })}
        </div>

        <ScaleFocusHover
          createReference={createReference}
          classNames={"flex flex-col items-center justify-center text-white"}
        >
          <BsChevronRight size={70} />
        </ScaleFocusHover>
      </div>

    </main>

    <FooterHomepage createReference={createReference} />
  </Page >;
}
