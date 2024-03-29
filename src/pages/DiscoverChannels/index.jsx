import React, { useEffect, useRef, useState } from 'react'

import Page from '../../components/Page'
import Header from '../../components/Header'
import ButtonDiscoveryChannels from '../../components/ButtonDiscoveryChannels'
import AudioDescButton from '../../components/AudioDescButton'
import Footer from '../../components/Footer'

import { initialBroadcasters } from "../../configs/emissoras"
import keyMapping from "./keyMapping"

export default function DiscoverChannels() {

  let emissorasValues = Object.values(initialBroadcasters).slice(0, 12)

  const [status, setStatus] = useState("start")
  const [scanProgress, setScanProgress] = useState(0);
  const [channelsFound, setChannelsFound] = useState([]);

  const refs = useRef([]);
  let focusIndex = 0;

  function handleChannels() {
    let currentIndex = 0;
    let auxProgres = 100 / emissorasValues.length // quanto vai aumentar a cada canal encontrado

    setStatus("scanning")

    const timeout = setInterval(() => {

      if (currentIndex < emissorasValues.length) {
        const currentEmissora = emissorasValues[currentIndex];
        if (currentEmissora) {
          setChannelsFound(prev => [...prev, currentEmissora]);

          // Atualizando o progresso e não permitindo que passe de 100%
          setScanProgress(prev => Math.min(100, Math.ceil(prev + auxProgres)))
        }
        currentIndex++;
      } else {

        setStatus("finished")
        setScanProgress(100)
        clearInterval(timeout); // Limpa o intervalo quando todas as emissoras foram adicionadas
      }
    }, 1000); // Intervalo de 1 segundo entre cada adição
  }

  function createReference(el, type) {
    // Atualmente, ela conta quantos elementos têm no array de refs, e coloca o elemento na ultima posição com o id == len(refs)

    if (el) {

      if (!el.id) {

        if (!type) {
          el.id = refs.current.length;
        } else {
          el.id = 0
        }

        el.onfocus = () => handleFocus(el);
        refs.current.push(el);
      }
    }
  }

  function handleKeyDown(key) {


    if (!keyMapping[key.code]) {
      return handleFocusElement(key);
    }
  }

  // Função utilizada para navegação pelo teclado
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

      if (newFocus < 0) {
        newFocus = 0;
      } else if (newFocus >= refs.current.length) {
        newFocus = refs.current.length - 1;
      }

      refs.current[newFocus].focus();
    }
  }

  function handleFocus(el) {

    if (el) {
      // Tem que converter pra número, porque o id vem como string
      // Assim previnirá erros de "8" + 1 == 81
      focusIndex = Number(el.id);
      console.log(el);
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
      <Header title='Configurando a sua TV' className={"border-b border-b-zinc-400"} />

      <main className='flex-1 flex flex-col w-full'>
        <h3 className='font-semibold text-3xl text-center text-white mt-8'>Procurando por Emissoras de TV aberta de sua região...</h3>

        <div className='flex flex-wrap flex-1 flex-col h-full py-4'>

          <p className='text-center mx-auto text-2xl text-white'>Progresso: {scanProgress}%</p>
          <p className='text-center mx-auto text-2xl text-white'>Apps de TV Aberta Encontrados: {channelsFound.length}</p>

          <div className='flex flex-1 items-center w-full flex-wrap  justify-center gap-x-8 gap-y-4 p-4'>
            {channelsFound.map((channel, indexChannel) => {

              return (
                <div
                  key={indexChannel}
                  className=" h-[140px] w-[250px] rounded-2xl bg-white overflow-hidden ">

                  <img src={channel.icon} alt="" className="h-full w-full object-cover" />
                </div>
              )
            })}

          </div>



          <footer className='flex flex-col items-center mt-auto'>
            {(status === "scanning" || status === "finished") &&
              <div className='flex flex-col '>
                <p className='text-center mx-auto text-2xl text-white mb-4'>Região identificada:</p>
                <p className='text-center mx-auto text-2xl text-white'> <span className='font-bold'>País:</span> Brasil </p>
                <p className='text-center mx-auto text-2xl text-white'> <span className='font-bold'>Cidade:</span> Brasília </p>
              </div >


            }

            <ButtonDiscoveryChannels
              createReference={createReference}
              onClick={() => handleChannels()}
              type={status}
            />
          </footer>

        </div>

      </main>

      <Footer classNames={"border-t border-t-zinc-300 "}>
        <AudioDescButton createReference={createReference} />
      </Footer>
    </Page >
  )
}
