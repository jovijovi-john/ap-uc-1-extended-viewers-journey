import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

// Componentes
import CardProgram from '../../components/CardProgram'
import FooterGuiaRadiodifusor from '../../components/FooterGuiaRadiodifusor'
import Header from "../../components/Header"
import Page from "../../components/Page"
import SearchBar from "../../components/SearchBar"
import ScaleFocusHover from '../../components/ScaleFocusHover'

// Depois colocar o icone de cada emissora no objeto emissoras
import TvIcon from "../../assets/EPG/tv.png"
import { IoMdAdd } from "react-icons/io";

import categoriesContent from "../../configs/categoriesContent"
import keyMapping from "./keyMapping"
import Profile from "../../components/Profile"
import CategoryStripe from '../../components/CategoryStripe'

export default function GuiaRadiodifusor() {

  const generos = Object.values(categoriesContent)

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
        ArrowUp: -11,
        ArrowDown: 11,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus;

      if (keyPressed.code === "ArrowDown") {

        // Se o foco está no header
        if (focusIndex <= 3) {
          newFocus = 4

          // Se o foco está nas duas primeiras linhas dos radiodifusores
        } else if (focusIndex <= 26) {
          newFocus = focusIndex + 11
          // Se o foco está no footer
        } else {
          newFocus = refs.current.length - 1
        }

      }
      // Aqui é a verificação pra esquerda e direita
      else {
        newFocus = focusIndex + keysFunctions[keyPressed.code];
      }

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
      <Header title='Guia de Streaming - Radiodifusor 1'>
        <SearchBar createReference={createReference} />
        <Profile createReference={createReference} />
      </Header>

      <main className='flex flex-col justify-center gap-4 w-full bg-zinc-800 flex-1 p-8 rounded-lg'>

        {generos.map((genero, indexGenero) => {
          return (
            <div className='flex gap-4 items-center' key={indexGenero} >

              {/* Radiodifusor */}
              <ScaleFocusHover createReference={createReference} classNames={"flex flex-col p-4 gap-4 rounded text-white min-w-44 items-center"} onClick={() => navigate("/GuiaCategoria")}>
                <img src={genero.categoryIcon} alt="" />
                <CategoryStripe color={genero.categoryColor} title={genero.categoryName} />
              </ScaleFocusHover>

              {/* Programas */}
              <div className='flex gap-5 ml-8'>
                {
                  genero.programs.map((programa, indexPrograma) => {
                    return <ScaleFocusHover
                      createReference={createReference}
                      key={indexPrograma}
                    // onClick={() => handleNavigate(programa)}
                    >

                      <CardProgram
                        blocked={programa.blocked}
                        genero={programa.genre}
                        radiodifusorName={programa.radiodifusor}
                      />
                    </ScaleFocusHover>
                  })
                }
              </div>

              {/* ADD icon */}
              <ScaleFocusHover createReference={createReference} classNames={"flex flex-col text-white  ml-auto w-44 rounded p-4 items-center text-center"}>
                <IoMdAdd size={72} />
                <p className='text-md text-center'>Mais streaming <br />
                  {genero.categoryName}
                </p>
              </ScaleFocusHover>
            </div>
          )
        })}
      </main>

      <FooterGuiaRadiodifusor createReference={createReference} />
    </Page>
  )
}
