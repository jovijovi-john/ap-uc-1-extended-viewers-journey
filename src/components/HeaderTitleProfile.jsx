import TitlePage from "../components/TitlePage";
import ProfileBox from "../components/ProfileBox";

import ProfileIcon from "../assets/profile.svg";

export default function HeaderTitleProfile({
  title = "Seu Guia de TV Aberta",
}) {
  return (
    <div className="flex justify-between items-center mr-5 p-4">
      <TitlePage name={title} />

      <ProfileBox icon={ProfileIcon} />
    </div>
  );
}
