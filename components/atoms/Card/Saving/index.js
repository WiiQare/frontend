import React from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';

const SavingCard = ({onClick = null, title, img}) => {
    return (
        <div onClick={onClick} className="order-2 md:order-1 bg-white p-5 md:p-10 flex flex-col justify-center items-center rounded-lg shadow-sm hover:shadow-md duration-200 transition-all cursor-pointer gap-4">
            <div className="p-3 rounded-md border border-blue-200 w-fit">
                <img src={img} alt="Myself" className="w-20" />
            </div>

            <div className="flex flex-col justify-center items-center">
                <h3 className="uppercase text-xs md:text-sm font-bold">{title}</h3>
                <HiArrowLongRight size={25}/>
            </div>
        </div>
    );
}

export default SavingCard;
