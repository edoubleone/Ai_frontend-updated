import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import boticon from "@/assets/icons/bot.svg";

interface IAvatarProps {
  fallback?: string;
  src?: string;
  imageClass?: string;
  fallbackClass?: string;
  avatarClass?: string;
}

const AvatarComponent: React.FC<IAvatarProps> = ({
  fallback = "",
  src = "",
  fallbackClass = "",
  imageClass = "",
  avatarClass = "",
}) => {
  return (
    <Avatar className={`${avatarClass}`}>
      <AvatarImage src={src} className={`${imageClass}`} />
      <AvatarFallback className={`${fallbackClass} bg-[#EEEEFD]`}>
        {fallback ? fallback : <img src={boticon} />}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
