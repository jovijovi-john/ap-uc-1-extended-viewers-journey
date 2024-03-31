import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Profile from "../../components/Profile";
import InitialAppContent from "../../components/InitialAppContent";
import Header from "../../components/Header";
import Page from "../../components/Page";
import FooterInitialApp from "../../components/FooterInitialApp";

import keyMapping from "./keyMapping";
import { emissoras } from "../../configs/emissoras";
import { setDataToStreamingLocalStorage } from "../../utils/dataStreaming";

// Variável para rastrear a div com foco
let focusIndex = 0; // tem que ficar aqui do lado de fora porque senão a cada atualização do componente ele atribuirá 0 de novo

export default function InitialApp() {

  // Array de refs
  const refs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  let program = JSON.parse(localStorage.getItem("program"))
  let broadcaster = JSON.parse(localStorage.getItem("broadcaster"))
  let broadcasterIndex = JSON.parse(localStorage.getItem("broadcasterIndex"))

  if (!broadcaster) {
    // Se a emissora não for passada (InfoDTV), obtém a emissora a partir do campo broadcaster
    broadcaster = emissoras[program.broadcaster]
  }

  if (!program) {
    // Se o programa não for informado, pega o programa definido em initialContent da emissora
    program = broadcaster.programs[broadcaster.initialContent]
  }

  // Acionado quando um elemento do array de referências é focado
  function handleFocus(el) {
    // Tem que converter pra número, porque o id vem como string
    // Assim previnirá erros de "8" + 1 == 81

    if (el) {
      focusIndex = Number(el.id);
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


  // Função para gerenciar eventos do teclado e mapeá-los para a função handleFocusElement
  function handleKeyDown(key) {

    // ZAPEAMENTO 
    if (key.code === "PageUp") {

      setDataToStreamingLocalStorage(broadcasterIndex + 1)
      return window.location.reload()
    } else if (key.code === "PageDown") {
      setDataToStreamingLocalStorage(broadcasterIndex - 1)
      return window.location.reload()
    }


    if (!keyMapping[key.code]) {
      return handleFocusElement(key);
    }

    if (broadcaster.name === "Tv Brasil") {
      return navigate(`/${keyMapping[key.code]}`, {
        state: {
          broadcaster,
          program
        }
      });
    }
  }

  // Função utilizada para navegação pelo teclado
  function handleFocusElement(keyPressed, keysFunctions) {


    if (!keysFunctions) {
      keysFunctions = {
        ArrowUp: -6,
        ArrowDown: 1,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus;

      switch (keyPressed.code) {
        case "ArrowUp":
          // Se o foco está no footer
          if (focusIndex >= 3) {

            if (focusIndex != refs.current.length - 1) {
              newFocus = 1
            } else {
              newFocus = 2
            }

          } else {
            newFocus = 0
          }
          break;
        case "ArrowDown":
          if (focusIndex != 0 && focusIndex <= 2) {
            newFocus = 3
          } else {
            newFocus = focusIndex + 1
          }
          break;

        default:
          newFocus = focusIndex + keysFunctions[keyPressed.code];
          break;
      }


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
      <Header>
        <Profile createReference={createReference} />
      </Header>

      <InitialAppContent
        createReference={createReference}
        programa={program}
        emissora={broadcaster} />

      <FooterInitialApp createReference={createReference} />

    </Page>
  );
}
