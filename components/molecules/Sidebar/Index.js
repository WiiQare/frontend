import React from 'react';
import { SlHome, SlWallet, SlEqualizer, SlGlobe } from "react-icons/sl";
import ItemSidebar from './ItemSidebar';

const Items = [
    {
        title: 'Home',
        icon: ({size, className}) => (<SlHome size={size} className={className} /> ),
        link: '/',
        active: '/',
    },
    {
        title: 'My Wallet',
        icon: ({size, className}) => (<SlWallet size={size} className={className} /> ),
        link: '/wallet',
        active: '/wallet'
    },
    {
        title: 'Invoices',
        icon: ({size, className}) => (<SlEqualizer size={size} className={className} /> ),
        link: '/invoices',
        active: '/invoices'
    },
    {
        title: 'Transactions',
        icon: ({size, className}) => (<SlGlobe size={size} className={className} /> ),
        link: '/transactions',
        active: '/transactions'
    }
]

const Sidebar = ({activePath}) => {
    return (
        <div className="min-h-full bg-white p-12 hidden md:flex flex-col gap-8">
            {Items.map(item => <ItemSidebar {...item} activePath={item.active == activePath ? true : false} /> )}
        </div>
    );
}

export default Sidebar;
