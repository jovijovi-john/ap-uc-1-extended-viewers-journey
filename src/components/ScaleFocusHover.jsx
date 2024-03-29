import React from 'react'
import FocusableElement from "./FocusableElement"

// Componente responsável por aumentar o tamanho do componente filho quando for acionado um evento de focus ou hover sobre ele
export default function ScaleFocusHover(
  { children,
    createReference = () => { },
    classNames,
    onClick = () => { },
    style = {},
    onFocus = () => { },
    type = "btn"
  }
) {
  return (
    <FocusableElement
      onFocus={onFocus}
      style={style}
      onClick={onClick}
      createReference={createReference}
      classNames={`cursor-pointer hover:scale-105 focus:scale-105 transition-all ${classNames}`}
      type={type}
    >
      {children}
    </FocusableElement>
  )
}
