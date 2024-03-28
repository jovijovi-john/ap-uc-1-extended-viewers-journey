import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Page from "../../components/Page.jsx"
import Header from "../../components/Header.jsx"
import SearchBar from "../../components/SearchBar.jsx"
import Profile from "../../components/Profile.jsx"
import ContentRecomendations from "../../components/ContentRecomendations.jsx"
import RecomendationsBar from "../../components/RecomendationsBar.jsx"

// Configs
import { emissoras } from '../../configs/emissoras.js'
import keyMapping from './keyMapping.js'


export default function Related() {

  // Array de refs
  const refs = useRef([]);

  // Utilizado para navegar entre as rotas da aplicação
  const navigate = useNavigate();

  // Variável para rastrear a div com foco
  let focusIndex = 0;

  // Acionado quando um elemento do array de referências é focado
  function handleFocus(el) {
    // Tem que converter pra número, porque o id vem como string
    // Assim previnirá erros de "8" + 1 == 81
    focusIndex = Number(el.id);
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
    return navigate(`/${keyMapping[key.code]}`, {
      state: {
        emissora: location.state.emissora,
        programa: location.state.programa
      }
    });
  }

  // Função utilizada para navegação pelo teclado
  function handleFocusElement(keyPressed, keysFunctions) {
    if (!keysFunctions) {
      keysFunctions = {
        ArrowUp: -5,
        ArrowDown: 5,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus;

      // Se o foco está no header


      switch (keyPressed.code) {
        case "ArrowUp":
          if (focusIndex <= 3) {
            newFocus = focusIndex - 1;
          } else if (focusIndex === 4) {
            newFocus = 0;
          } else {
            newFocus = 4
          }

          break;
        case "ArrowDown":
          if (focusIndex <= 3) {
            newFocus = 4
          } else {
            newFocus = focusIndex + 1;
          }

          break;
        default:
          newFocus = focusIndex + keysFunctions[keyPressed.code];
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

  const location = useLocation();

  const emissora = location.state.emissora
  const programa = location.state.programa

  const recomendations = emissora.related.map((indexProgram) => {
    return emissora.programs[indexProgram]
  })

  

  return (
    <Page >
      <Header title=''>
        <SearchBar createReference={createReference} />
        <Profile createReference={createReference} />
      </Header>

      <ContentRecomendations emissora={emissora} createReference={createReference} programa={programa} />

      <RecomendationsBar recomendations={recomendations} createReference={createReference} />

    </Page>
  )
}
