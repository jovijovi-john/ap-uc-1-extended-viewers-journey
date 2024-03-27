import React from "react";

export default function Page({ children }) {
  return (
    <div className="flex h-full bg-zinc-900 px-8  items-center flex-col overflow-hidden">
      {children}
    </div>
  );
}
