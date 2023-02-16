import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from "react-icons/fa"
import { FcCheckmark } from "react-icons/fc";
import { CiCircleInfo } from "react-icons/ci";

import bima from "../../../../public/images/bima.jpeg"
import { HiUserGroup } from 'react-icons/hi';

const CardProvider = () => {
    return (
        <div className='border hover:shadow rounded-lg py-4 px-5 flex flex-col md:flex-row justify-between gap-6 bg-white cursor-pointer'>
            {/* Provider */}
            <div className='flex gap-3'>
                <div className='w-32 h-24 md:w-40 md:h-32 border rounded-lg overflow-hidden'>
                    <Image src={bima} className="objectif-cover w-full h-full" />
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='text-gray-700 space-y-2'>
                        <h3 className='text-lg md:text-2xl font-bold'>B-Stack Family</h3>
                        <span className='text-sm font-light'>Provided by BIMA</span>
                    </div>

                    <span className='flex gap-3 items-center text-sm text-gray-700 font-light'>
                        <span className='bg-orange px-2 py-1 text-white text-sm rounded-md w-fit flex gap-3 items-center'>3.69 <FaStar /></span>
                        17 Plan
                    </span>
                </div>
            </div>

            {/* Category */}
            <div className='space-y-2'>
                <span className='py-1 px-2 rounded-full bg-[rgba(254,128,35,.3)] text-xs text-gray-700 font-light flex items-center gap-2 w-fit'>TeleHealth <CiCircleInfo size={18} /></span>
                <ul className='space-y-2 w-64'>
                    <li className='flex items-center gap-2 text-xs text-gray-700 font-light'><FcCheckmark size={18}/> Consultation Service 24/7 - Generalists and Specialists</li>
                    <li className='flex items-center gap-2 text-xs text-gray-700 font-light'><FcCheckmark /> Insurance Benefits GHC 76,000</li>
                    <li className='flex items-center gap-2 text-xs text-gray-700 font-light'><FcCheckmark /> Medication Benefits GHC 180</li>
                </ul>
            </div>

            {/* Pricing */}
            <div className='text-gray-700 flex md:block items-center gap-4 space-y-2'>
                <h5 className='font-light'>Starts at</h5>
                <h3 className='text-2xl font-semibold'>$12.15<span className='font-extralight text-lg'>/mo</span></h3>
                <HiUserGroup size={24} className="hidden md:block"/>
            </div>

            {/* Buttons */}
            <div className='self-center flex md:flex-col gap-3'>
                <Link href={"/learn"} legacyBehavior>
                    <button className='bg-blue-600 text-white font-extralight py-3 md:px-9 px-5 rounded-lg text-sm'>Learn more</button>
                </Link>

                <Link href={"/learn"} legacyBehavior>
                    <button className='border border-blue-600 hover:bg-[rgba(28,100,242,.3)] text-blue-600 font-extralight py-3 md:px-9 px-5 rounded-lg text-sm transition duration-300'>Enroll now</button>
                </Link>
            </div>
        </div>
    );
}

export default CardProvider;
