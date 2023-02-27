import Link from 'next/link';
import React from 'react';
import { SlHome, SlWallet, SlEqualizer, SlGlobe } from "react-icons/sl";
import ItemBottom from './ItemBottom';

const Items = [
    {
      title: "Home",
      icon: ({ size, className }) => <SlHome size={size} className={className} />,
      link: "/",
      active: ["/"],
    },
    {
      title: "My Wallet",
      icon: ({ size, className }) => (
        <SlWallet size={size} className={className} />
      ),
      link: "/wallet",
      active: ["/wallet"],
    },
    {
      title: "Invoices",
      icon: ({ size, className }) => (
        <SlEqualizer size={size} className={className} />
      ),
      link: "/invoices",
      active: ["/invoices"],
    },
    {
      title: "Transactions",
      icon: ({ size, className }) => (
        <SlGlobe size={size} className={className} />
      ),
      link: "/transactions",
      active: ["/transactions", "/transactions/[id]"],
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