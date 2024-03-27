import React from 'react'

import { useNavigate } from "react-router-dom"

export default function ButtonDiscoveryChannels({ onClick, type, createReference }) {

  const navigate = useNavigate()

  function handleClick() {
    switch (type) {
      case "scanning":
        break;
      case "finished":
        navigate("/homepage")
        break;
      default:
        onClick()
        break;
    }

  }


  return (
    <button tabIndex={0} ref={(el) => createReference(el)} className='flex rounded-md min-w-56 h-24 items-center justify-center mt-8 mb-6 text-2xl text-white' onClick={handleClick} >
      {type === "start" && <ButtonStart />}
      {type === "scanning" && <ButtonScanning />}
      {type === "finished" && <ButtonFinished />}
    </button>
  )

}

const ButtonStart = ({ onClick, }) => {
  return (
    <div className='flex flex-1 h-full w-full items-center justify-center bg-green-700'
    >
      Iniciar Busca
    </div >
  )
}

const ButtonScanning = ({ }) => {
  return (
    <div className='flex flex-1 h-full w-full items-center justify-center bg-yellow-600'
    >
      Buscando...
    </div >
  )
}

const ButtonFinished = ({ }) => {



  return (
    <div className='flex flex-1 h-full w-full items-center justify-center bg-red-700'>
      Fechar Busca
    </div >
  )
}