import React from "react";

export default function Footer({ children, classNames }) {
  return (
    <footer className={`mt-auto w-full p-4 flex ${classNames}`}>
      {children}
    </footer>
  );
}
