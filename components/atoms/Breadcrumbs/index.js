import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({items}) => {
    return (
        <ul className='flex gap-2'>
            {
                items.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link} legacyBehavior>
                            <span className={`flex gap-2 ${index < items.length - 1 ? 'font-semibold text-sky': 'font-light text-gray-500'}`}>
                                {item.item} 
                                {index < items.length - 1 ? <span>/</span> : <></>}
                            </span>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default Breadcrumb;
