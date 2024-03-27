export default function ProfileBox({ icon }) {
  return (
    <div className="flex flex-row items-center justify-end p-4">
      <h3 className="mr-5 text-2xl font-semibold text-right text-sky-400">
        Nome do <br />
        Telespectador
      </h3>

      <img className="w-24" src={icon} />
    </div>
  );
}
