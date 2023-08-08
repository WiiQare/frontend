import Link from "next/link";
import React, { useContext } from "react";
import { SlHome, SlGlobe, SlSettings, SlSpeech } from "react-icons/sl";
import ItemBottom from "./ItemBottom";
import IconBadge from "../../atoms/Icons/Badge";
import { DrawContext } from "../../../pages/_app";
import { LiaHandHoldingUsdSolid, LiaHospital } from "react-icons/lia";

const MenuBottom = ({ activePath }) => {
  const { draw, setDraw } = useContext(DrawContext);

  const Items = [
    {
      title: "Accueil",
      icon: ({ size, className }) => (
        <SlHome size={size} className={className} />
      ),
      link: "/",
      active: ["/"],
    },
    {
      title: "Transactions",
      icon: ({ size, className }) => (
        <SlGlobe size={size} className={className} />
      ),
      link: "/transactions",
      active: ["/transactions", "/transactions/[id]"],
    },

    // {
    //   title: "Messages",
    //   icon: ({ size, className }) => (
    //     <label htmlFor="my-drawer-4" onClick={() => setDraw(!draw)}>
    //       <IconBadge className={"py-0"}>
    //         <SlSpeech size={size} className={className} />
    //       </IconBadge>
    //     </label>
    //   ),
    //   active: ["/messages", "/messages/[id]"],
    // },

    {
      title: "Épargne",
      icon: ({ size, className }) => (
        <LiaHandHoldingUsdSolid size={size + 5} className={className} />
      ),
      link: "/saving",
      active: ["/saving", "/saving/[id]", "/saving/new", "/saving/summary"],
    },

    {
      title: "Hôpital",
      icon: ({ size, className }) => (
        <LiaHospital size={size + 5} className={className} />
      ),
      link: "/hospitals",
      active: ["/hospitals", "/hospitals/[id]"],
    },

    {
      title: "Paramètres",
      icon: ({ size, className }) => (
        <SlSettings size={size} className={className} />
      ),
      link: "/profile",
      active: ["/profile"],
    },
  ];

  return (
    <div className="flex gap-4 md:hidden mx-auto items-center justify-evenly fixed bottom-0 bg-white py-4 px-4 md:px-14 drop-shadow-md w-full z-50">
      {Items.map((item, index) => (
        <ItemBottom
          key={index}
          {...item}
          activePath={item.active.includes(activePath) ? true : false}
        />
      ))}
    </div>
  );
};

export default MenuBottom;
