import React from 'react'

export default function InputText({ createReference = () => { }, placeholder, className }) {
  return (
    <input
      ref={(el) => createReference(el)}
      type="text"
      className={`${className} bg-transparent  text-white w-full p-4 border-2 border-white rounded-lg text-3xl`}
      placeholder={placeholder}
    />
  )
}
