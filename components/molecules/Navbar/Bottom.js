import Link from 'next/link';
import React from 'react';
import { SlHome, SlGlobe, SlSettings, SlSpeech } from "react-icons/sl";
import ItemBottom from './ItemBottom';
import IconBadge from '../../atoms/Icons/Badge';

const Items = [
  {
    title: "Home",
    icon: ({ size, className }) => <SlHome size={size} className={className} />,
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

  {
    title: "Messages",
    icon: ({ size, className }) => (
      <label htmlFor="my-drawer-4">
        <IconBadge className={"py-0"}>
          <SlSpeech size={size} className={className}/>
        </IconBadge>
      </label>
    ),
    active: ["/messages", "/messages/[id]"],
  },

  {
    title: "Settings",
    icon: ({ size, className }) => (
      <SlSettings size={size} className={className} />
    ),
    link: "/profile",
    active: ["/profile"],
  },
  ];

const MenuBottom = ({activePath}) => {
    return (
        <div className='flex gap-4 md:hidden mx-auto items-center justify-evenly fixed bottom-0 bg-white py-4 px-4 md:px-14 drop-shadow-md w-full z-50'>
                {Items.map(item => <ItemBottom {...item} activePath={item.active.includes(activePath) ? true : false} /> )}
        </div>
    );
}

export default MenuBottom;