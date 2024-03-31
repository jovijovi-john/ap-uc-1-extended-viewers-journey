import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

// Componentes
import CardProgram from '../../components/CardProgram'
import FooterGuiaPorEmissora from '../../components/FooterGuiaPorEmissora'
import Header from "../../components/Header"
import Page from "../../components/Page"
import SearchBar from "../../components/SearchBar"
import ScaleFocusHover from '../../components/ScaleFocusHover'

// Depois colocar o icone de cada emissora no objeto emissoras
import TvIcon from "../../assets/EPG/tv.png"
import { IoMdAdd } from "react-icons/io";

import { emissoras } from "../../configs/emissoras"
import keyMapping from "./keyMapping"
import Profile from "../../components/Profile"

export default function GuiaPorEmissora() {

  const canais = Object.values(emissoras)

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
        ArrowUp: -10,
        ArrowDown: 10,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus = focusIndex + keysFunctions[keyPressed.code];

      // Aqui ta verificando se o valor de foco atualiza ta válido ou não 
      if (newFocus < 0) {
        newFocus = 0;

      } else if (newFocus >= refs.current.length - 1) {
        newFocus = refs.current.length - 1;
      }

      refs.current[newFocus].focus();
    }
  }

  function handleNavigate(program) {
    if (!program.blocked) {
      navigate("/EPG-InfoDTV")
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
      <Header title='Guia de Streaming da Tv Aberta'>
        <SearchBar createReference={createReference} />
        <Profile createReference={createReference} />
      </Header>

      <main className='flex flex-col justify-center gap-4 w-full bg-zinc-800 flex-1 p-8 rounded-lg overflow-hidden'>

        <div className='flex flex-col gap-4 w-full h-full overflow-y-scroll overflow-x-hidden'>
          {canais.map((canal, indexCanal) => {
            return (
              <div className='flex gap-4 items-center ' key={indexCanal} >

                {/* Radiodifusor */}
                <ScaleFocusHover createReference={createReference} classNames={"flex flex-col p-4 gap-4 rounded text-white min-w-44 items-center"} onClick={() => navigate("/GuiaRadiodifusor")}>
                  <div className='w-[240px] h-[150px] rounded-lg overflow-hidden bg-white'>
                    <img src={canal.icon} alt="" className='object-cover w-full h-full' />
                  </div>
                  {/* <p className='text-2xl'>{canal.name}</p> */}
                </ScaleFocusHover>

                {/* Programas */}
                <div className='flex gap-5 ml-8 '>
                  {
                    canal.programs.map((programa, indexPrograma) => {
                      return (
                        <ScaleFocusHover
                          // onClick={() => handleNavigate(programa)}
                          createReference={createReference}
                          key={indexPrograma}
                          classNames={"shrink-0"}
                        >

                          <CardProgram
                            key={indexPrograma}
                            blocked={programa.blocked}
                            genero={programa.genre}
                            icon={programa.icon}
                          />
                        </ScaleFocusHover>
                      )
                    })
                  }
                </div>

                {/* ADD icon */}
                <ScaleFocusHover createReference={createReference} classNames={"flex flex-col text-white  ml-auto w-44 rounded p-4 items-center"}>
                  <IoMdAdd size={72} />
                  <p className='text-md'>Mais streaming <br />
                    {canal.name}</p>
                </ScaleFocusHover>
              </div>
            )
          })}
        </div>
      </main>

      <FooterGuiaPorEmissora createReference={createReference} />
    </Page>
  )
}
