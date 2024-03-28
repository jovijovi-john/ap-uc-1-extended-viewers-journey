import React, { useState, useEffect, useRef } from "react";
import EPGProgram from "../../components/EPGProgram";

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

export default function EPG() {
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
      if (!el.id) {
        el.id = refs.current.length;
        el.onfocus = () => handleFocus(el);
        refs.current.push(el);
      }
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

  // Acionado quando o componente for renderizado pela primeira vez
  useEffect(() => {
    // Focando o primeiro elemento assim que a tela carregar
    if (refs.current) {
      refs.current[0].focus();
    }

    // Adicionando o listener do teclado
    window.onkeydown = handleKeyDown;
  }, []);

  return (
    <Page>
      <Header profileIconVisible={true}>
        <SearchBar createReference={createReference} />
        <Profile createReference={createReference} />
      </Header>

      <main className="flex-1 bg-zinc-800 px-4 rounded-lg w-full overflow-y-scroll h-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full py-8">
          {emissorasValues.map((broadcaster, broadcasterIndex) => {
            return (
              <EPGProgram
                key={broadcasterIndex}
                broadcasterIndex={broadcasterIndex}
                broadcaster={broadcaster}
                createReference={createReference}
              />
            );
          })}
        </div>
      </main>

      <FooterEpg createReference={createReference} />
    </Page>
  );
}
