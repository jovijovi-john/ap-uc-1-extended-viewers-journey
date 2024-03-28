import { emissoras } from "../configs/emissoras";

const emissorasValues = Object.values(emissoras)

export function setDataToStreamingLocalStorage(newIndex) {

  if (newIndex >= 0 && newIndex < emissorasValues.length) {

    let newBroadcaster = emissorasValues[newIndex]
    let newBroadcasterProgram = newBroadcaster.programs[newBroadcaster.initialContent]

    let broadcasterIndexLS = JSON.stringify(newIndex)
    let broadcasterLS = JSON.stringify(newBroadcaster)
    let broadcasterProgramLS = JSON.stringify(newBroadcasterProgram)

    localStorage.setItem("broadcasterIndex", broadcasterIndexLS)
    localStorage.setItem("broadcaster", broadcasterLS)
    localStorage.setItem("program", broadcasterProgramLS)
  }
}