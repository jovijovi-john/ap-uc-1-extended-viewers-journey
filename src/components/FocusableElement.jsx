import React from 'react'

export default function FocusableElement(
  { createReference = () => { },
    children,
    classNames,
    onClick = () => { },
    style = {},
    onFocus = () => { }
  }) {
  return (
    <button
      tabIndex={0}
      onFocus={onFocus}
      ref={(el) => createReference(el)}
      className={`${classNames}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}
