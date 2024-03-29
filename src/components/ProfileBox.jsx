export default function ProfileBox({ icon }) {

  // Pegando o nome do localstorage
  const nome = JSON.parse(localStorage.getItem("username")) ?? "Anônimo"

  return (
    <div className="flex flex-row items-center justify-end p-4">
      <h3 className="mr-5 text-2xl font-semibold text-right text-sky-400">
        {nome}
      </h3>

      <img className="w-24" src={icon} />
    </div>
  );
}
