import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Profile from "../../components/Profile";
import InitialAppContent from "../../components/InitialAppContent";
import Header from "../../components/Header";
import Page from "../../components/Page";
import FooterInitialApp from "../../components/FooterInitialApp";

import keyMapping from "./keyMapping";
import { emissoras } from "../../configs/emissoras";

// Variável para rastrear a div com foco
let focusIndex = 0; // tem que ficar aqui do lado de fora porque senão a cada atualização do componente ele atribuirá 0 de novo

export default function InitialApp() {

  // Array de refs
  const refs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  let programa = location.state.programa;
  let emissora = location.state.emissora;
  let emissoraIndex = location.state.emissoraIndex


  const emissorasValues = Object.values(emissoras)


  if (!emissora) {
    // Se a emissora não for passada (InfoDTV), obtém a emissora a partir do campo broadcaster
    emissora = emissoras[programa.broadcaster]
  }

  if (!programa) {
    // Se o programa não for informado, pega o programa definido em initialContent da emissora
    programa = emissora.programs[emissora.initialContent]
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

    // ZAPEAMENTO (Dá pra refatorar, fazer uma função já que as duas verificações são muito parecidas)
    if (key.code === "PageUp") {

      let nextBroadcasterIndex = emissoraIndex + 1
      let nextBroadcaster = emissorasValues[nextBroadcasterIndex]
      let nextBroadcasterProgram = nextBroadcaster.programs[nextBroadcaster.initialContent]

      window.location.reload()

      return navigate("/initialApp",
        {
          state: {
            program: nextBroadcasterProgram,
            emissora: nextBroadcaster,
            emissoraIndex: nextBroadcasterIndex
          }
        })


    } else if (key.code === "PageDown") {
      console.log("CANAL ANTERIOR")

      let previousBroadcasterIndex = emissoraIndex - 1
      let previousBroadcaster = emissorasValues[previousBroadcasterIndex]
      let previousBroadcasterProgram = previousBroadcaster.programs[previousBroadcaster.initialContent]

      window.location.reload()

      return navigate("/initialApp",
        {
          state: {
            program: previousBroadcasterProgram,
            emissora: previousBroadcaster,
            emissoraIndex: previousBroadcasterIndex
          }
        })
    }


    if (!keyMapping[key.code]) {
      return handleFocusElement(key);
    }

    return navigate(`/${keyMapping[key.code]}`, {
      state: {
        emissora: emissora,
        programa: programa
      }
    });
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
        programa={programa}
        emissora={emissora} />

      <FooterInitialApp createReference={createReference} />

    </Page>
  );
}
