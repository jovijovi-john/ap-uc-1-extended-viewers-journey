import { createContext, useState } from "react";

export const AudioDescContext = createContext({
  audioContext: new AudioContext(),
});

function AudioDescProvider({ children }) {
  const [active, setActive] = useState();
  const [audio, setAudio] = useState()

  return <AudioDescContext.Provider
    value={{
      active, setActive,
      audio, setAudio
    }}>
    {children}
  </AudioDescContext.Provider>

}

export default AudioDescProvider;