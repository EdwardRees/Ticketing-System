"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCircle,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const Icon = ({ type, size, ...props }: { type: string; size?: SizeProp }) => {
  return (
    <FontAwesomeIcon
      size={size || "2x"}
      icon={
        type === "user"
          ? faUser
          : type === "user-circle"
          ? faUserCircle
          : faQuestionCircle
      }
      {...props}
    />
  );
};

export { Icon };
