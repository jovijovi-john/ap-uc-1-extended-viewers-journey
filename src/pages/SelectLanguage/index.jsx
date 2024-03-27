import React, { useEffect, useRef } from 'react'

import { useNavigate } from "react-router-dom"

import Page from '../../components/Page'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AudioDescButton from '../../components/AudioDescButton'
import LibrasButton from '../../components/LibrasButton'

import keyMapping from "./keyMapping"
import ScaleFocusHover from '../../components/ScaleFocusHover'

export default function SelectLanguage() {

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

    if (el) {
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
      refs.current.push(el)


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
        ArrowUp: -3,
        ArrowDown: 1,
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
      <Header title='Selecione o idioma'></Header>

      <main className='flex flex-1 flex-col w-full bg-zinc-800 p-8 rounded-xl'>
        <h2 className='font-bold text-4xl text-zinc-300 mb-4'>Idiomas</h2>

        <select ref={(el) => createReference(el)} className="text-4xl  border-2 border-white rounded-md p-4 ">
          <option value="">Português</option>
          <option value="">Inglês</option>
          <option value="">Espanhol</option>
          <option value="">Francês</option>
          <option value="">Alemão</option>
          <option value="">Italiano</option>
          <option value="">Japonês</option>
          <option value="">Mandarim</option>
          <option value="">Russo</option>
          <option value="">Coreano</option>
          <option value="">Árabe</option>
          <option value="">Hindi</option>
          <option value="">Bengali</option>
          <option value="">Punjabi</option>
          <option value="">Turco</option>
          <option value="">Tâmil</option>
          <option value="">Telugu</option>
          <option value="">Marathi</option>
          <option value="">Vietnamita</option>
          <option value="">Urdu</option>
          <option value="">Javanês</option>
          <option value="">Gujarati</option>
          <option value="">Polonês</option>
          <option value="">Ucraniano</option>
          <option value="">Persa</option>
          <option value="">Malaio</option>
          <option value="">Xangainês</option>
          <option value="">Oriá</option>
          <option value="">Panjabi</option>
        </select>

      </main>

      <Footer classNames={"items-center"}>
        <AudioDescButton createReference={createReference} />
        <LibrasButton createReference={createReference} />


        <ScaleFocusHover
          onClick={() => navigate("/ProfileConfig")}
          createReference={createReference}
          type='btn'
          classNames='bg-emerald-600 ml-auto px-8 text-3xl rounded-xl h-20 font-semibold text-white'
        >
          Avançar
        </ScaleFocusHover>
      </Footer>
    </Page >
  )
}
