import TitlePage from "../components/TitlePage";

export default function Header({ title = "Seu Guia de TV Aberta", children, className }) {
  return (
    <header className={`flex w-full justify-between items-center mr-5 px-4 py-4 min-h-40 ${className}`}>
      <TitlePage name={title} />

      {children}
    </header>
  );
}
