import ScaleFocusHover from "./ScaleFocusHover";
import ProfileBox from "./ProfileBox";
import ProfileIcon from "../assets/profile.svg";

export default function Profile({ createReference }) {
  return (
    <ScaleFocusHover createReference={createReference} classNames="ml-4">
      <ProfileBox icon={ProfileIcon} />
    </ScaleFocusHover>
  );
}
