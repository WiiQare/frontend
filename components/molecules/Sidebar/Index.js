import React, { useContext } from 'react';
import { SlHome, SlGlobe } from 'react-icons/sl';
import { LiaHandHoldingUsdSolid, LiaHospital } from 'react-icons/lia';
import ItemSidebar from './ItemSidebar';
import { DrawContext } from '../../../pages/_app';

const Items = [
  {
    title: 'Accueil',
    icon: ({ size, className }) => <SlHome size={size} className={className} />,
    link: '/',
    active: ['/'],
  },
  {
    title: 'Transactions',
    icon: ({ size, className }) => (
      <SlGlobe size={size} className={className} />
    ),
    link: '/transactions',
    active: ['/transactions', '/transactions/[id]'],
  },

  {
    title: 'Hôpital',
    icon: ({ size, className }) => (
      <LiaHospital size={size + 5} className={className} />
    ),
    link: '/hospitals',
    active: ['/hospitals', '/hospitals/[id]'],
  },

  {
    title: 'Épargne de Santé',
    icon: ({ size, className }) => (
      <LiaHandHoldingUsdSolid size={size + 5} className={className} />
    ),
    link: '/saving',
    active: ['/saving', '/saving/[id]', '/saving/new', '/saving/summary'],
  },
];

const Sidebar = ({ activePath }) => {
  const { hideSide } = useContext(DrawContext);
  return (
    <div
      className={`h-screen fixed bg-white px-6 py-12 ${
        hideSide ? 'hidden' : ''
      } hidden md:flex flex-col gap-8`}
    >
      {Items.map((item, index) => (
        <ItemSidebar
          {...item}
          activePath={item.active.includes(activePath) ? true : false}
          key={index}
        />
      ))}

      <span
        className={`text-xs text-gray-400 absolute bottom-24 ${
          hideSide ? 'hidden' : ''
        }`}
      >
        &copy; Copyright <span className="text-red-600">❤️</span> WiiQare{' '}
        {new Date().getFullYear()}
      </span>
    </div>
  );
};

export default Sidebar;
