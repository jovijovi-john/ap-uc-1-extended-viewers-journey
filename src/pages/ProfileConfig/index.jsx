import React, { useEffect, useRef } from 'react'

import { useNavigate } from "react-router-dom"

import Page from '../../components/Page'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AudioDescButton from '../../components/AudioDescButton'
import LibrasButton from '../../components/LibrasButton'
import ProfileCardBox from '../../components/ProfileCardBox.jsx'

import { FaCirclePlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import keyMapping from './keyMapping.js'

export default function ProfileConfig() {

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
        ArrowUp: -2,
        ArrowDown: 2,
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
      <Header title='Configuração de Perfil' className={"border-b-2 border-b-zinc-700"}></Header>

      <main className='flex-1 bg-zinc-900 flex items-center justify-center  w-full gap-6'>

        <ProfileCardBox createReference={createReference} onClick={() => navigate("/DiscoverChannels")}>
          <div className='rounded-full overflow-hidden'>
            <FaUserCircle className='bg-zinc-100 text-blue-900 w-full h-full object-cover' alt="" size={160} />
          </div>

          <p>Continuar sem criar perfil</p>
        </ProfileCardBox>

        <ProfileCardBox createReference={createReference} onClick={() => navigate("/CreateProfile")}>
          {/* <ProfileCardBox createReference={createReference}> */}
          <div className='rounded-full overflow-hidden'>
            <FaCirclePlus className='w-full h-full object-cover text-green-500' alt="" size={160} />
          </div>
          <p>Adicionar perfil</p>
        </ProfileCardBox>

      </main>

      <Footer classNames={"flex gap-5 border-t-2 border-t-zinc-700"}>
        <AudioDescButton createReference={createReference} />
        <LibrasButton createReference={createReference} />
      </Footer>
    </Page>
  )
}
