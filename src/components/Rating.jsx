import React from "react";
import { indicacoes } from "../configs/indicacoes";

export default function Rating({ type, size, className }) {
  return <img src={indicacoes[type]} className={`${size} ${className}`} alt="" />;
}
