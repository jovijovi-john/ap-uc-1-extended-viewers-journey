import { useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Page from "../../components/Page";
import SearchBar from "../../components/SearchBar";
import Profile from "../../components/Profile";
import BackIconFooter from "../../components/BackIconFooter";

import keyMapping from "./keyMapping";
import ProgramEPG from "../../components/ProgramEPG.jsx";
import IconLeftTextRight from "../../components/IconLeftTextRight";
import BorderedIcon from "../../components/BorderedIcon";
import FooterInfoDTV from "../../components/FooterInfoDTV";

export default function EPGInfoDTV() {

  const location = useLocation();
  const program = location.state.program // Já ta no ponto de receber o programa dinamicamente
  const broadcasterIndex = location.state.broadcasterIndex

  const refs = useRef([]);
  const navigate = useNavigate();

  // Função utilizada para criar uma referência do elemento
  // Variável para rastrear a div com foco
  let focusIndex = 0;

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

    // navegar para as teclas mapeadas em keyMapping
    return navigate(`/${keyMapping[key.code]}`, {
      state: {
        broadcaster,
        program
      }
    });
  }

  // Função utilizada para navegação pelo teclado
  function handleFocusElement(keyPressed, keysFunctions) {
    if (!keysFunctions) {
      keysFunctions = {
        ArrowUp: -3,
        ArrowDown: 3,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus;

      if (keyPressed.code === "ArrowDown" && focusIndex <= 3) {
        newFocus = 4;
      } else {
        newFocus = focusIndex + keysFunctions[keyPressed.code];

        if (newFocus < 0) {
          newFocus = 0;
        } else if (newFocus >= refs.current.length) {
          newFocus = refs.current.length - 1;
        }
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
      <Header
        title="Informações sobre o programa"
        createReference={createReference}
      >
        <SearchBar createReference={createReference} />

        <Profile createReference={createReference} />
      </Header>

      <ProgramEPG programa={program} createReference={createReference} broadcasterIndex={broadcasterIndex} />

      <FooterInfoDTV createReference={createReference} />
    </Page>
  );
}
