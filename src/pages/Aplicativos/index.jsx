import React, { useEffect, useRef } from 'react'

import { useNavigate } from "react-router-dom"

// Components
import Page from "../../components/Page.jsx"
import Header from "../../components/Header.jsx"
import SearchBar from "../../components/SearchBar.jsx"
import Profile from "../../components/Profile.jsx"
import FooterTvAberta from "../../components/FooterTvAberta.jsx"
import RadiodifusorCard from "../../components/RadiodifusorCard.jsx"

import keyMapping from '../TvAberta/keyMapping.js'

import { apps } from "../../configs/apps.js"

export default function Apps() {

  const appsValues = Object.values(apps);

  // Array de refs
  const refs = useRef([]);

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
      console.log(el);
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

    return navigate(`/${keyMapping[key.code]}`);
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleClickApp(app) {
    // navigate("/InitialApp", {
    //   state: {
    //     programa: app.programs[app.initialContent],
    //     emissora: app
    //   }
    // })
  }

  return (
    <Page>
      <Header title='Seus aplicativos de Tv Aberta'>
        <SearchBar createReference={createReference} />

        <Profile createReference={createReference} />
      </Header>

      <div className='flex flex-wrap gap-8 justify-center  flex-1'>
        {appsValues.map((app, appIndex) => {
          return (
            <RadiodifusorCard
              onClick={() => handleClickApp(app)}
              createReference={createReference}
              key={appIndex}
              icon={app.icon}
              classNames={"w-[300px] h-[150px]"}
            />
          )
        })}
      </div>

      <FooterTvAberta createReference={createReference} />
    </Page>
  )
}
