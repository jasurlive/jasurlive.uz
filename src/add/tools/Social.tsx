import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import {
  FaUserAstronaut,
  FaChess,
  FaGithub,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdHeadset } from "react-icons/md";
import ielts from "../media/img/icons/ielts.png";
import "../css/social.css";

const socialLinks = [
  {
    href: "https://www.chess.com/member/jasurgraduate",
    icon: FaChess,
    className: "social-icon",
  },
  {
    href: "https://github.com/jasurgraduate",
    icon: FaGithub,
    className: "social-icon",
  },
  {
    href: "https://t.me/jasurjacob_bot",
    icon: FaTelegram,
    className: "social-icon",
  },
  {
    href: "https://wa.me/+447775180677",
    icon: FaWhatsapp,
    className: "social-icon",
  },
  {
    href: "https://playlistgo.vercel.app/",
    icon: MdHeadset,
    className: "social-icon",
  },
  {
    href: "https://ieltslive.vercel.app/",
    image: ielts,
    className: "social-icon-ielts",
  },
];

const SocialMenu: React.FC = () => {
  return (
    <motion.div
      className="social-menu"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", mass: 0.75, duration: 0.7 }}
    >
      {socialLinks.map(({ href, icon: Icon, image, className }, index) => (
        <a key={index} href={href} className={className}>
          {Icon ? (
            <Icon />
          ) : (
            <img src={image} alt="icon" className="social-icon-ielts" />
          )}
        </a>
      ))}
    </motion.div>
  );
};

const Social: React.FC = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="social-button">
          <FaUserAstronaut />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content>
          <SocialMenu />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Social;
