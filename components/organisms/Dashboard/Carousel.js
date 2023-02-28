import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { BiCaretRight } from "react-icons/bi";
import '@splidejs/react-splide/css';
import "../../../styles/Carousel.module.css";
import Image from 'next/image';

import startup from '../../../public/images/startup.png';
import Link from 'next/link';


const Carousel = () => {
    return (
        <div className='px-2 pt-4 md:px-6'>
            <Splide hasTrack={false} aria-label="Attribution"
                options={
                    {
                        type: "loop",
                        perPage: 1,
                        heightRatio: 0.6,
                        mediaQuery: 'min',
                        breakpoints: {
                            640: {
                                heightRatio: 0.35,
                                perPage: 1,
                                gap: 20
                            }
                        },
                        pagination: true,
                    }
                }
                
                className="container mx-auto pl-8 overflow-hidden bg-yellow-300 rounded-3xl"
            >
                <SplideTrack hasTrack={false} className="overflow-hidden">

                    <SplideSlide className="w-full">
                        <div className='bg-yellow-300 h-full flex justify-center items-center pl-12 gap-10'>
                            <div className='flex flex-col gap-7'>
                                <div className='space-y-3'>
                                    <h1 className='text-3xl md:text-5xl font-bold'>Start your safe live</h1>
                                    <p className='text-sm text-gray-700 w-full'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, beatae nam eveniet hic nesciunt explicabo dolore quidem Adipisci, beatae nam eveniet hic nesciunt explicabo dolore quidem</p>
                                </div>
                                <Link href={"#"} legacyBehavior>
                                    <a className='bg-gray-800 w-fit p-3 text-yellow-300 rounded-lg'>
                                        Get Started
                                    </a>
                                </Link>
                            </div>

                            <div className='hidden md:w-3/5 md:flex justify-end relative -right-10'>
                                <Image src={startup} className="object-cover "/>
                            </div>
                        </div>
                    </SplideSlide>
                    
                    <SplideSlide className="w-full">
                        <div className='bg-yellow-300 h-full flex justify-center items-center pl-12 gap-10'>
                            <div className='flex flex-col gap-7'>
                                <div className='space-y-3'>
                                    <h1 className='text-3xl md:text-5xl font-bold'>Life is Good</h1>
                                    <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, beatae nam eveniet hic nesciunt explicabo dolore quidem</p>
                                </div>
                                <Link href={"#"} legacyBehavior>
                                    <a className='bg-gray-800 w-fit p-3 text-yellow-300 rounded-lg'>
                                        Buy a voucher
                                    </a>
                                </Link>
                            </div>

                            <div className='hidden md:w-3/5 md:flex justify-end relative -right-10'>
                                <Image src={startup} className="object-cover "/>
                            </div>
                        </div>
                    </SplideSlide>

                   

                </SplideTrack>

                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev bg-transparent relative !-left-7 top-2 bottom-0 !bg-[#F0F4FD] p-4 text-3xl focus:ring-0">
                        <span className="bg-white rounded-full p-1 !text-red-500">
                            <BiCaretRight />
                        </span>
                    </button>
                    <button className="splide__arrow splide__arrow--next bg-transparent relative !-right-7 top-2 bottom-0 !bg-[#F0F4FD] p-4 text-3xl focus:ring-0">
                        <span className="bg-white rounded-full p-1 !text-red-500">
                            <BiCaretRight />
                        </span>
                    </button>
                </div>

            </Splide>
        </div>
    );
}

export default Carousel;
