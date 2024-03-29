import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import Page from '../../components/Page';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CheckboxInput from '../../components/CheckboxInput';
import InputText from '../../components/InputText';
import AudioDescButton from '../../components/AudioDescButton';
import LibrasButton from '../../components/LibrasButton';
import Rating from '../../components/Rating';

import IconLeftTextRight from '../../components/IconLeftTextRight';
import BorderedIcon from '../../components/BorderedIcon';

import { FaRegUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { LuMonitorSmartphone } from "react-icons/lu";

import ClosedCaptionsButton from '../../components/ClosedCaptionsButton';
import EnhancedDialogButton from '../../components/EnhancedDialogButton';
import ScaleFocusHover from '../../components/ScaleFocusHover';
import FocusableElement from '../../components/FocusableElement';

import keyMapping from "./keyMapping"

let focusIndex = 0;

export default function CreateProfile() {

  const refs = useRef([]);
  const formRef = useRef()

  const navigate = useNavigate()

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
        ArrowUp: -1,
        ArrowDown: 1,
        ArrowLeft: -1,
        ArrowRight: 1,
      };
    }

    if (keysFunctions[keyPressed.code]) {
      keyPressed.preventDefault();

      let newFocus = focusIndex + keysFunctions[keyPressed.code];

      switch (keyPressed.code) {
        case "ArrowUp":
          if (focusIndex >= 3 && focusIndex <= 9) {
            newFocus = 2;
          } else if (focusIndex >= 10 && focusIndex <= 13) {
            newFocus = 3;
          } else if (focusIndex == 14) {
            newFocus = 10
          } else if (focusIndex >= 15 && focusIndex <= 18) {
            newFocus = 14
          } else if (focusIndex == 19) {
            newFocus = 0
          } else if (focusIndex == 20) {
            newFocus = 15
          } else if (focusIndex == 21) {
            newFocus = 18
          } else if (focusIndex == 22) {
            newFocus = 19
          } else {
            newFocus = focusIndex - 1;
          }
          break

        case "ArrowDown":

          if (focusIndex >= 3 && focusIndex <= 9) {
            newFocus = 10;
          } else if (focusIndex >= 10 && focusIndex <= 13) {
            newFocus = 14;
          } else if (focusIndex >= 15 && focusIndex <= 17) {
            newFocus = 20
          } else if (focusIndex === 18) {
            newFocus = 21
          } else if (focusIndex === 19) {
            newFocus = 22
          } else {
            newFocus = focusIndex + 1;
          }

          break
        case "ArrowLeft":
          if (focusIndex === 19) {
            newFocus = 1;
          } else {
            newFocus = focusIndex - 1;
          }
          break

        case "ArrowRight":
          const objAux = {
            1: true,
            9: true,
            13: true,
            14: true,
            18: true
          }

          if (objAux[focusIndex]) {
            newFocus = 19
          }

          break
      }

      if (newFocus < 0) {
        newFocus = 0;
      } else if (newFocus >= refs.current.length) {
        newFocus = refs.current.length - 1;
      }

      refs.current[newFocus].focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const nome = formData.get("nome")
    const usernameLS = JSON.stringify(nome)

    localStorage.setItem("username", usernameLS)
    navigate("/homepage")
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
      <Header title='Criando seu Perfil Smart TV'>
        <IconLeftTextRight createReference={createReference}>
          <LuMonitorSmartphone size={96} color='white' />
          <p className='text-3xl'>Usar Smartphone</p>
        </IconLeftTextRight>
      </Header>

      <form className='h-full flex flex-col' onSubmit={handleSubmit} ref={formRef}>
        <main className='h-full w-full flex flex-col'>

          <div className='w-full grid grid-cols-[10fr,2fr] gap-4 mt-4'>

            <div className='bg-zinc-800 px-8 py-12 rounded-lg flex flex-col gap-8 '>
              <InputText name={"nome"} placeholder="Nome do perfil (obrigatório)" createReference={createReference} />

              <CheckboxInput createReference={createReference}>
                <p>Este é um Perfil de Grupo (ex.: família, hóspedes...)</p>
              </CheckboxInput>

              <div className='w-full grid grid-cols-[6fr,4fr] gap-8'>
                <InputText placeholder="Data de nascimento dd/mm/aaaa" createReference={createReference} />

                <div className='flex gap-4'>
                  <FocusableElement createReference={createReference}>
                    <Rating type={"livre"} />
                  </FocusableElement>

                  <FocusableElement createReference={createReference}>
                    <Rating type={10} />
                  </FocusableElement>

                  <FocusableElement createReference={createReference}>
                    <Rating type={12} />
                  </FocusableElement>

                  <FocusableElement createReference={createReference}>
                    <Rating type={14} />
                  </FocusableElement>

                  <FocusableElement createReference={createReference}>
                    <Rating type={16} />
                  </FocusableElement>

                  <FocusableElement createReference={createReference}>
                    <Rating type={18} />
                  </FocusableElement>

                </div>
              </div>

              <div className='grid grid-cols-[6fr,4fr] gap-8'>
                <CheckboxInput createReference={createReference}>
                  <p>Este é um Perfil de Criança</p>
                </CheckboxInput>

                <div className='flex gap-4'>
                  <span className='text-3xl text-white'>Gênero</span>

                  <CheckboxInput createReference={createReference}>
                    <span>M</span>
                  </CheckboxInput>

                  <CheckboxInput createReference={createReference}>
                    <span>F</span>
                  </CheckboxInput>

                  <CheckboxInput createReference={createReference}>
                    <span>NB</span>
                  </CheckboxInput>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-zinc-300 text-3xl'>Idioma selecionado</p>

                <select className="text-3xl  border-2 border-white rounded-md p-4" ref={(el) => createReference(el)}>
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
              </div>

              <div className='w-full flex justify-between mt-4'>
                <AudioDescButton createReference={createReference} />
                <LibrasButton createReference={createReference} />
                <ClosedCaptionsButton createReference={createReference} />
                <EnhancedDialogButton createReference={createReference} />
              </div>
            </div>

            <div className='flex justify-center items-center w-full'>
              <ScaleFocusHover classNames='flex flex-col gap-8 items-center p-4 rounded-lg' createReference={createReference}>

                <FaRegUserCircle className='text-white w-full h-full object-cover' alt="" size={160} />

                <p className='text-3xl text-center text-white'>Escolha seu Avatar</p>
              </ScaleFocusHover>
            </div>


          </div>
        </main>

        <Footer classNames={"items-center p-8 justify-between"}>
          <CheckboxInput className={"w-2/3"} createReference={createReference}>
            <p>Concordo com a coleta e processamento de meus dados para uma melhor experiência, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD). <a href="" className='text-blue-600'>Saiba mais.</a></p>
          </CheckboxInput>

          <div className='flex gap-8'>
            <IconLeftTextRight classNames={"bg-blue-700 max-h-[100px]"} onClick={() => window.location.reload()} createReference={createReference}>
              <p className='text-2xl font-semibold'>Criar Outro</p>

              <BorderedIcon color={"white"}>
                <FaPlus size={56} />
              </BorderedIcon>
            </IconLeftTextRight>

            <IconLeftTextRight type={"submit"} classNames={"bg-green-700 max-h-[100px]"} createReference={createReference}>
              <p className='text-2xl font-semibold'>Avançar</p>

              <BorderedIcon color={"white"}>
                <HiArrowRight size={56} />
              </BorderedIcon>
            </IconLeftTextRight>
          </div>
        </Footer>
      </form>
    </Page >
  );
}
