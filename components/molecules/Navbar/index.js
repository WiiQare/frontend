import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import Image from 'next/image';
import Link from 'next/link';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlinePersonOutline, MdMailOutline } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineBell, AiOutlineMessage } from "react-icons/ai";

import logo from '../../../public/images/favicon.png'
import logoDark from '../../../public/images/logo_dark.png'
import avatar from '../../../public/images/avatar.jpg'
import IconBadge from '../../atoms/Icons/Badge';
import NotificationBadge from '../../atoms/Card/Notifications/Badge';

const Menu = () => {
    return (
        <div className='flex gap-12 mx-auto items-center justify-between fixed top-0 bg-white py-4 px-4 md:px-14 shadow-sm w-full'>
            <div className='flex gap-16 items-center'>
                <div className='flex gap-2 items-center'>
                    <button className='cursor-pointer md:hidden'>
                        <HiMenuAlt3 className='text-3xl text-blue-500' />
                    </button>
                    <Link href={"/"} legacyBehavior>
                        <Image
                            src={logo}
                            className="h-8 md:h-14 w-min object-left object-contain"
                        />
                    </Link>
                    <Link href={"/"} legacyBehavior>
                        <Image
                            src={logoDark}
                            className="h-6 md:h-9 object-left object-contain w-min"
                        />
                    </Link>

                </div>

                <div className='gap-4 items-center hidden md:flex'>
                    <button className='cursor-pointer'>
                        <HiMenuAlt3 className='text-4xl text-blue-600' />
                    </button>

                    <form class="">
                        <label for="voice-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-10  p-3" placeholder="Search..." required />
                            <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg aria-hidden="true" class="w-4 h-4 text-gray-500 hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='flex items-center justify-between gap-16'>

                <div className='hidden md:flex'>
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        className="shadow-sm rounded-2xl w-fit"
                        label={<IconBadge total={2}><AiOutlineBell size={25}/></IconBadge>}
                    >
                        <NotificationBadge 
                            avatar={avatar}
                            time={"29 July 2020 - 02:26 PM"}
                            title={"Dr sultads Send you Photo"}
                        />
                    
                        <NotificationBadge 
                            avatar={"https://via.placeholder.com/150"}
                            time={"02 February 2023 - 1:43 PM"}
                            title={"Bienvenu has received money from..."}
                        />

                         <NotificationBadge 
                            avatar={avatar}
                            time={"29 July 2020 - 02:26 PM"}
                            title={"Dr sultads Send you Photo"}
                        />

                        <Dropdown.Divider />
                        
                        <Dropdown.Item>
                            <p className='text-center w-full flex items-center justify-center text-lg text-gray-500 font-light gap-2'>
                                See All Notification
                                <AiOutlineArrowRight />
                            </p>
                        </Dropdown.Item>
                    </Dropdown>
                  
                </div>

                <div className='hidden md:flex'>
                    <IconBadge total={24}><AiOutlineMessage size={25} /></IconBadge>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className='text-right hidden md:block'>
                        <span>
                            Hello, <span className='font-bold'>Bienvenu Z.</span>
                        </span>
                        <h5 className='text-xs font-light'>Actif</h5>
                    </div>
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        className="shadow-sm rounded-2xl w-48"
                        label={<Avatar alt="User settings" img="/images/avatar.jpg" rounded={true} size={30} className="w-12 h-12"/>}
                    >
                        <Dropdown.Item>
                            <Link href={"/profile"}>
                                <span className='flex gap-3 text-lg items-center'>
                                    <MdOutlinePersonOutline className='text-lg text-sky' size={23}/>
                                    <font>Profile</font>
                                </span>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href={"/inbox"}>
                                <span className='flex gap-3 text-lg items-center'>
                                    <MdMailOutline className='text-lg text-green-500' size={23}/>
                                    <font>Inbox</font>
                                </span>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Link href={"/logout"}>
                                <span className='flex gap-3 text-lg items-center'>
                                    <MdMailOutline className='text-lg text-red-500' size={23}/>
                                    <font>Logout</font>
                                </span>
                            </Link>
                        </Dropdown.Item>
                    </Dropdown>
                </div>

            </div>
        </div>
    );
}

export default Menu;