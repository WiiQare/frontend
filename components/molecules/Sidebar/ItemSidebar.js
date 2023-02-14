import Link from 'next/link';
import React from 'react';

const ItemSidebar = ({title, icon, link, activePath}) => {
    return (
        <Link href={link} legacyBehavior>
            <span className={`flex items-center gap-5 hover cursor-pointer`}>
                <span className={`h-12 w-12 flex items-center justify-center p-2 rounded-full ${activePath ? 'bg-sky text-white' : 'text-gray-400 hover:!text-sky !transition !duration-300'}`}>
                    {icon({size: 24 })}
                </span>
                <span className={`font-normal text-md ${activePath ? 'text-black font-semibold' : 'text-gray-400 hover:!text-sky !transition !duration-300'}`} >{title}</span>
            </span>
        </Link>
    );
}

export default ItemSidebar;