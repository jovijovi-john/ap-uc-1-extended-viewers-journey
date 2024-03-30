import React, { useState, useEffect, useRef } from "react";


import { useNavigate } from "react-router-dom";

import Page from "../../components/Page";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import SearchBar from "../../components/SearchBar";
import FooterEpg from "../../components/FooterEpg";

// import programas from "../../configs/contentRadiodifusoresEPG";

import { emissoras } from "../../configs/emissoras";

// Arquivo contendo o mapeamento das teclas referente às rotas da aplicação
import keyMapping from "./keyMapping";
import ProgramDynamicSize from "../../components/ProgramDynamicSize";

export default function EPGTimeline() {
  // Array de refs
  const refs = useRef([]);

  // Utilizado para navegar entre as rotas da aplicação
  const navigate = useNavigate();

  // Variável para rastrear a div com foco
  let focusIndex = 0;

  const emissorasValues = Object.values(emissoras)

  // Acionado quando um elemento do array de referências é focado
  function handleFocus(el) {
    // Tem que converter pra número, porque o id vem como string
    // Assim previnirá erros de "8" + 1 == 81
    focusIndex = Number(el.id);
    console.log(el);
  }

  // Função utilizada para criar uma referência do elemento
  function createReference(el) {
    // Atualmente, ela conta quantos elementos têm no array de refs, e coloca o elemento na ultima posição com o id == len(refs)

    if (el) {
      el.id = refs.current.length;
      el.onfocus = () => handleFocus(el);
      refs.current.push(el);
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
  function handleFocusElement(keyPressed, keysFunctions) {
    if (!keysFunctions) {
      keysFunctions = {
        ArrowUp: -6,
        ArrowDown: 6,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    const lastElementIndex = refs.current.length - 1

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus = focusIndex + keysFunctions[keyPressed.code];

      switch (keyPressed.code) {
        case "ArrowUp":

          // Se o foco está na primeira linha
          if (focusIndex >= 3 && focusIndex < 10) {
            newFocus = 0;

          }
          // Se o foco ta no footer
          else if (focusIndex > refs.current.length - 3) {

            // Focar o primeiro elemento da ultima linha
            newFocus = lastElementIndex - 7

          } else {
            newFocus = focusIndex - 6
          }

          break

        case "ArrowDown":

          // Se o foco ta no header
          if (focusIndex < 3) {
            newFocus = 4;

            // Se o foco está nas primeiras linhas
          } else if (focusIndex < refs.current.length - 8) {
            newFocus = focusIndex + 6

            // Se o foco está na ultima linha
          } else if (focusIndex < refs.current.length - 2) {
            newFocus = refs.current.length - 2

            // Se o foco ta no footer
          } else {
            newFocus = focusIndex + 1
          }

          break

        default:
          break
      }

      if (newFocus < 0) {
        newFocus = 0;
      } else if (newFocus >= refs.current.length) {
        newFocus = lastElementIndex;
      }

      refs.current[newFocus].focus();
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

  let schedules = [
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
  ]

  return (
    <Page>
      <Header profileIconVisible={true}>
        <SearchBar createReference={createReference} />
        <Profile createReference={createReference} />
      </Header>

      <main className="flex-1 bg-zinc-800 p-4 rounded-lg w-full overflow-y-scroll h-full relative">
        {/* <div className="grid grid-cols-[3fr,15fr] bg-blue-500">

          <div></div>


        </div> */}

        <div className="grid grid-cols-[300px,1fr] grid-rows-[80px,1fr] relative min-h-[800px] overflow-hidden ">

          {/* -------------------------------- HEADER --------------------------------------------------- */}
          <div className="sticky left-0 bg-zinc-800 z-50">

          </div>

          <div className="sticky left-0 top-0 flex w-full pl-16 ">
            {schedules.map((schedule, index) => {
              return (
                <div className="w-[200px] relative" key={index}>
                  <div className="relative -left-[9%] text-2xl text-white">{schedule}h</div>

                  <div className="flex">
                    <div className="w-1 bg-zinc-200 h-4"></div>
                    <div className="w-full h-1 bg-zinc-200 border-l-4 border-l-zinc-200 mt-auto">
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* -------------------------------- EMISSORAS --------------------------------------------------- */}

          <div className="flex flex-col h-full gap-2  sticky left-0 bg-zinc-800 pr-8">

            {emissorasValues.map((emissora, index) => {
              return (
                <div className="w-full h-[200px] flex items-center justify-center" key={index}>
                  <div className="h-[160px] w-full bg-white overflow-hidden rounded-3xl flex items-center justify-center">
                    <img src={emissora.icon} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>)
            })}



          </div>

          {/* -------------------------------- PROGRAMAS --------------------------------------------------- */}
          <div className="pl-16 w-full overflow-scroll">
            <div className="flex flex-col gap-2 ">
              {emissorasValues.map((emissora, indexEmissora) => {
                return <div className="h-[200px]  w-full " key={indexEmissora}>
                  <div className="flex h-full gap-1 ">
                    {emissora.programs.map((programa, indexPrograma) => {
                      return (
                        <ProgramDynamicSize
                          key={indexPrograma}
                          program={programa}
                          broadcaster={emissora}
                          broadcasterIndex={indexEmissora}
                          createReference={createReference} onClick={() => { }}
                        />
                      )
                    })}
                  </div>
                </div>
              })}

            </div>
          </div>
        </div>
      </main>

      <FooterEpg createReference={createReference} />
    </Page>
  );
}
