import { useState } from 'react';
import Link from "next/link";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CiCircleInfo } from "react-icons/ci";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import SimpleHeader from '../../atoms/Card/Header/simple';
import Image from 'next/image';

import avatar from "../../../public/images/avatar.jpg";

const TabHistories = [
    {
        name: "Monthly",
        transactions: [
            {
                fullname: "Bienvenu Z.",
                email: "bzigabe@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "5,321",
                paymentMethod: "Mastercard",
                state: 1
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 0
            }
        ]
    },

    {
        name: "Weekly",
        transactions: [
            {
                fullname: "Bienvenu Z.",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "5,321",
                paymentMethod: "Mastercard",
                state: 1
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 1
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 0
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@gmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 2
            }
        ]
    },

    {
        name: "Today",
        transactions: [
            {
                fullname: "Peter NDENGO",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "5,321",
                paymentMethod: "Mastercard",
                state: 1
            }
        ]
    }
]

const HistoryWallet = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="space-y-4 bg-white py-8 px-6 drop-shadow-sm rounded-lg">

            <Box sx={{ width: '100%' }}>

                <SimpleHeader title={"Payment History"} describe={"Lorem ipsum dolor sit amet, consectetur"}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {TabHistories.map((item, index) => <Tab label={item.name} transactions={item.transactions} {...a11yProps(index)} key={index} />)}
                        </Tabs>
                    </Box>
                </SimpleHeader>

                <div>
                    {TabHistories.map((item, index) => <TabPanelContent transactions={item.transactions} value={value} index={index} />)}
                    {/* <TabPanel value={value} index={0} >

                        <section className="space-y-3">
                            <div tabIndex={0} className="border-b py-3 collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center ">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-[#2BC155] hover:bg-[#2BC155] hover:text-white text-[#2BC155] font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Completed</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={1} className="collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-orange hover:bg-orange hover:text-white text-orange font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Pending</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>
                        </section>

                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <section className="space-y-3">
                            <div tabIndex={0} className="collapse collapse-arrow border-b py-3  text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-[#2BC155] hover:bg-[#2BC155] hover:text-white text-[#2BC155] font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Completed</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={1} className="collapse collapse-arrow border-b py-3  text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-orange hover:bg-orange hover:text-white text-orange font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Pending</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>
                            <div tabIndex={1} className="collapse collapse-arrow border-b py-3  text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-orange hover:bg-orange hover:text-white text-orange font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Pending</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow border-b py-3  text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-[#2BC155] hover:bg-[#2BC155] hover:text-white text-[#2BC155] font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Completed</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={1} className="collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-orange hover:bg-orange hover:text-white text-orange font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Pending</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>
                        </section>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <section className="space-y-3">

                            <div tabIndex={0} className="collapse collapse-arrow border-b py-3 text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-gray-300 hover:bg-gray-400 hover:text-white text-gray-400 font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Cancel</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow border-b py-3 text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-gray-300 hover:bg-gray-400 hover:text-white text-gray-400 font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Cancel</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow border-b py-3 text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-gray-300 hover:bg-gray-400 hover:text-white text-gray-400 font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Cancel</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow border-b py-3 text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-[#2BC155] hover:bg-[#2BC155] hover:text-white text-[#2BC155] font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Completed</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>

                            <div tabIndex={1} className="collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden">
                                <div className="collapse-title flex gap-7 justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-16 h-16">
                                            <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-xl">Bienvenu Z.</h1>
                                            <span className="text-xs text-sky font-semibold">bienvenuezig@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-sm font-medium">
                                        <span>June 1, 2023</span>
                                        <span>08:22 AM</span>
                                    </div>

                                    <h1 className="font-bold text-lg">+$5,532</h1>
                                    <h1 className="font-bold text-lg">Mastercard</h1>

                                    <Link href={"/learn"} legacyBehavior>
                                        <button className='border border-orange hover:bg-orange hover:text-white text-orange font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300'>Pending</button>
                                    </Link>

                                </div>
                                <div className="collapse-content flex gap-4">
                                    <div className="overflow-x-auto w-5/6">
                                        <table className="table table-zebra text-xs w-full">
                                            <thead>
                                                <tr>
                                                    <th>ID Payment</th>
                                                    <th>Payment Method</th>
                                                    <th>Invoice Date</th>
                                                    <th>Due Date</th>
                                                    <th>Date Paid</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>#00123521</th>
                                                    <td>MasterCard</td>
                                                    <td>April 29, 2020</td>
                                                    <td>June 5, 2020</td>
                                                    <td>June 4, 2020</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                                        <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                            </div>
                        </section>
                    </TabPanel> */}
                </div>
            </Box>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanelContent({ transactions, value, index }) {
    return (
        <TabPanel value={value} index={index} >

            <section className="space-y-3">

                {transactions.map((item, index) => <ItemHistory {...item} key={index} index={index} total={transactions.length ?? 0} />)}
                

            </section>

        </TabPanel>
    )
}

function ItemHistory({fullname, email, createdAt, amount, paymentMethod, state, index, total}) {
    return (
        <div tabIndex={index} className={`${total < index ? "border-b py-3" : ""} collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden`}>
            <div className="collapse-title flex gap-7 justify-between items-center ">
                <div className="flex gap-3 items-center">
                    <div className="w-16 h-16">
                        <Image src={avatar} className="object-cover rounded-full w-full h-full" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl">{fullname}</h1>
                        <span className="text-xs text-sky font-semibold">{email}</span>
                    </div>
                </div>

                <div className="flex flex-col text-sm font-medium">
                    <span>{createdAt.date}</span>
                    <span>{createdAt.hour}</span>
                </div>

                <h1 className="font-bold text-lg">+${amount}</h1>
                <h1 className="font-bold text-lg">{paymentMethod}</h1>

                <ButtonNoAction 
                    color={state == 0 ? 'orange' : state == 1 ? "[#2BC155]" : "gray-300"}
                    text={state == 0 ? 'Pending' : state == 1 ? "Completed" : "Cancel"}
                />
            </div>
            <div className="collapse-content flex gap-4">
                <div className="overflow-x-auto w-5/6">
                    <table className="table table-zebra text-xs w-full">
                        <thead>
                            <tr>
                                <th>ID Payment</th>
                                <th>Payment Method</th>
                                <th>Invoice Date</th>
                                <th>Due Date</th>
                                <th>Date Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>#00123521</th>
                                <td>MasterCard</td>
                                <td>April 29, 2020</td>
                                <td>June 5, 2020</td>
                                <td>June 4, 2020</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm">
                    <CiCircleInfo size={45} className="text-gray-400" /> Lorem ipsum dolor sit amet, consectetur
                </span>
            </div>
        </div>
    )
}

function ButtonNoAction({color, text}) {
    return (
        <button className={`border border-${color} hover:bg-${color} hover:text-white text-${color} font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300`}>{text}</button>
    )
}

export default HistoryWallet;
