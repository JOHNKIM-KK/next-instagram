// @flow
import * as React from "react";

type Props = {
  image?: string | null;
  size?: "small" | "normal";
  highlight?: boolean;
};
const Avatar = ({ image, size = "normal", highlight = false }: Props) => {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Avatar;

const getContainerStyle = (size: string, highlight: boolean): string => {
  const baseStyle = "rounded-full flex items-center justify-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

const getImageSizeStyle = (size: string): string => {
  return size === "small"
    ? "w-[34px] h-[34px] p-[0.1rem]"
    : "w-16 h-16 p-[0.2rem]";
};
