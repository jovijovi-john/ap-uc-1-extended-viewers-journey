import React from "react";
import { indicacoes } from "../configs/indicacoes";

export default function Rating({ type, size }) {
  return <img src={indicacoes[type]} className={size} alt="" />;
}
