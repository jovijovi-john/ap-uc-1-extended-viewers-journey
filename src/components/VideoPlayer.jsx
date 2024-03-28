import React, { useEffect, useRef, useState } from 'react';
import videoProgram from "../assets/program_globo.mp4";

export default function VideoPlayer({ className, programa, createReference = () => { } }) {
  const videoRef = useRef(null);

  const [timer, setTimer] = useState(0)

  // useEffect(() => {
  //   if (programa.video) {
  //     const videoElement = videoRef.current;
  //     const timer = setTimeout(() => {
  //       if (videoElement && !document.fullscreenElement) {
  //         videoElement.requestFullscreen().catch(err => {
  //           console.error(`Erro ao entrar em tela cheia: ${err.message} (${err.name})`);
  //         });
  //       }
  //     }, 4000); // 4000 milissegundos = 4 segundos

  //     return () => clearTimeout(timer); // Limpa o temporizador quando o componente for desmontado
  //   }
  // }, [programa.video]);

  return (
    programa.video &&
    <video
      autoPlay={true}
      ref={(el) => {
        videoRef.current = el;
        createReference(el);
      }}
      className={`${className}`}
      controls
      src={videoProgram}

    />
  );
}