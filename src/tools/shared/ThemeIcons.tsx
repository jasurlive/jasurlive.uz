import type { ReactNode } from "react";
import { FiSun, FiMoon, FiFeather, FiDroplet, FiCloud, FiAperture, FiCpu } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import type { Theme } from "../lib/themes";

export const THEME_ICONS: Record<Theme, ReactNode> = {
  light: <FiSun />,
  dark: <FiMoon />,
  linen: <FiFeather />,
  fjord: <FiDroplet />,
  moss: <FiCloud />,
  charcoal: <FiAperture />,
  matrix: <FiCpu />,
  sega: <IoGameControllerOutline />,
};
