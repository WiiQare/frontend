import Link from "next/link";
import React, { useContext } from "react";
import { DrawContext } from "../../../pages/_app";

const ItemSidebar = ({ title, icon, link, activePath }) => {
  const {hideSide} = useContext(DrawContext)
  return (
    <Link href={link} legacyBehavior>
      <span className={`flex items-center gap-5 hover cursor-pointer`}>
        <span
          className={`h-12 w-12 flex items-center justify-center p-2 rounded-full ${
            activePath
              ? "bg-sky text-white"
              : "text-gray-400 hover:!text-sky !transition !duration-300"
          }`}
        >
          {icon({ size: 24 })}
        </span>
        <span
          className={`font-normal text-md ${
            activePath
              ? "text-black font-semibold"
              : "text-gray-400 hover:!text-sky !transition !duration-300"
          }`}
        >
          <span className={`${hideSide ? "hidden": ""}`}>{title}</span>
          
        </span>
      </span>
    </Link>
  );
};

export default ItemSidebar;
