import { useState } from "react";
import { CiCircleCheck, CiCircleList } from "react-icons/ci";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { AiOutlineUpload } from "react-icons/ai";
import { TbReceipt } from "react-icons/tb";
import { BiCaretRight } from "react-icons/bi";
import '@splidejs/react-splide/css';

import CardHeader from "../../atoms/Card/Header";
import WalletBalance from "./Balance";

import avatar from "../../../public/images/avatar.jpg";
import Image from "next/image";
import HistoryWallet from "./History";


const Wallet = () => {
	const [activeIndexSlide, setActiveIndexSlide] = useState(0);
	return (
		<div className="p-2 space-y-6 md:py-8 md:px-6 mb-12">
			<CardHeader
				title={"My Wallet"}
				filter={{
					label: {
						title: "Sort By",
						className: "py-1 w-[auto]"
					},
					className: "w-[auto]",
					icon: () => <CiCircleList />,
					items: ["Detail", "Cancel"]
				}}
			/>

			<WalletBalance
				wallet={{
					amount: "673,412.66",
					valid: "08/21",
					holder: "Peter NDENGO",
					number: "**** **** **** 1234",
					progress: 45
				}}

				progresses={{
					installment: {
						percent: 62,
						amount: "5,412"
					},
					investment: {
						percent: 89,
						amount: "10,619"
					},
					property: {
						percent: 41,
						amount: "1,282"
					}
				}}
			/>

			<HistoryWallet />

			<div className="grid md:grid-cols-2 gap-3 md:gap-8">
				<div className="bg-gradient-to-r from-sky to-indigo-500 shadow-md rounded-lg p-6 text-white flex items-center gap-7">
					<div className="p-3 bg-white shadow rounded-full">
						<AiOutlineUpload size={30} className="text-sky" />
					</div>

					<h2 className="text-lg font-semibold">Transfert</h2>
				</div>
				<div className="bg-gradient-to-r from-purple to-pink-500 shadow-md rounded-lg p-6 text-white flex items-center gap-7">
					<div className="p-3 bg-white shadow rounded-full">
						<TbReceipt size={30} className="text-purple" />
					</div>

					<h2 className="text-lg font-semibold">Send Voucher</h2>
				</div>
			</div>

			<div className="md:grid md:grid-cols-2 flex flex-col gap-3 md:gap-8 mt-8 w-full">
				
				<div className="bg-white py-4 px-2 relative drop-shadow-sm rounded-lg space-y-8 w-full md:w-full h-full">
					<div className="flex flex-row gap-6 md:gap-0 md:items-center justify-between px-6">
						<div className="space-y-2">
							<h2 className="font-bold text-xl text-gray-700">Quickly Voucher Transfer</h2>
							<span className="text-xs text-gray-500 hidden md:flex">Lorem ipsum dolor sit amet, consectetur</span>
						</div>

					</div>
					<Splide hasTrack={false} aria-label="Attribution"
						options={
							{
								type: "slide",
								perPage: 2,
								mediaQuery: 'min',
								breakpoints: {
									1024: {
										perPage: 3,
										gap: 20
									}
								},
								pagination: false,
								focus: 'center',
							}
						}
						onActive={(splide, slide) => {
							if(slide.slideIndex == -1) {
								setActiveIndexSlide(slide.index)
							}
						}}
						className="container mx-auto px-8"
					>
						<SplideTrack hasTrack={false}>

							<SplideSlide className="w-min flex flex-col gap-2 items-center justify-center p-3">
								<div className="w-20 h-2O relative">
									<Image src={avatar} className="object-cover rounded-xl" />
									<span className={`${activeIndexSlide === 0 ? '' : "hidden"} p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}><CiCircleCheck size={18} /></span>
								</div>

								<span className="font-semibold text-sm">Geoffrey M.</span>
								<span className="text-xs font-light">frdrcpeter@gmail.com</span>
							</SplideSlide>

							<SplideSlide className="w-min flex flex-col gap-2 items-center justify-center p-3">
								<div className="w-20 h-2O relative">
									<Image src={avatar} className="object-cover rounded-xl" />
									<span className={`${activeIndexSlide == 1 ? '' : "hidden"} p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}><CiCircleCheck size={18} /></span>
								</div>

								<span className="font-semibold text-sm">Geoffrey M.</span>
								<span className="text-xs font-light">qwerty@gmail.com</span>
							</SplideSlide>

							<SplideSlide className="w-min flex flex-col gap-2 items-center justify-center p-3">
								<div className="w-20 h-2O relative">
									<Image src={avatar} className="object-cover rounded-xl" />
									<span className={`${activeIndexSlide == 2 ? '' : "hidden"} p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}><CiCircleCheck size={18} /></span>
								</div>

								<span className="font-semibold text-sm">Bienvenu Z.</span>
								<span className="text-xs font-light">aa12@gmail.com</span>
							</SplideSlide>

							<SplideSlide className="w-min flex flex-col gap-2 items-center justify-center p-3">
								<div className="w-20 h-2O relative">
									<Image src={avatar} className="object-cover rounded-xl" />
									<span className={`${activeIndexSlide == 3 ? '' : "hidden"} p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}><CiCircleCheck size={18} /></span>
								</div>

								<span className="font-semibold text-sm">Don Moliso</span>
								<span className="text-xs font-light">azerty@gmail.com</span>
							</SplideSlide>

							<SplideSlide className="w-min flex flex-col gap-2 items-center justify-center p-3">
								<div className="w-20 h-2O relative">
									<Image src={avatar} className="object-cover rounded-xl" />
									<span className={`${activeIndexSlide == 4 ? '' : "hidden"} p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}><CiCircleCheck size={18} /></span>
								</div>

								<span className="font-semibold text-sm">Peter NDENGO</span>
								<span className="text-xs font-light">abc@gmail.com</span>
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

					<div className="py-3 px-8 flex flex-col md:flex-row items-center justify-center gap-10">
						<h4 className="font-semibold">Amount</h4>
						<form className="w-full">
							<label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Transfer amount</label>
							<div className="relative flex w-full">
								<input type="number" min={10} id="search" name="amount" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky focus:border-sky" placeholder="Enter amount" required defaultValue={10} />
								<button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-sky hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Transfer Now</button>
							</div>
						</form>
					</div>
				</div>

				<div className="bg-white mb-10 py-4 px-2 relative drop-shadow-sm rounded-lg space-y-8 w-full md:w-full h-full">
					<div className="flex flex-col md:flex-row gap-6 md:gap-0 md:items-center justify-between px-6">
						<div className="space-y-2">
							<h2 className="font-bold text-xl text-gray-700">Voucher Sent</h2>
							<span className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur</span>
						</div>

					</div>

					<div className="px-6 space-y-3">
						<div className="pb-6 border-b flex gap-6 justify-between items-center">
							<div className="flex gap-3 items-center">
								<div className="w-12 h-12">
									<Image src={avatar} className="rounded-full object-cover" />
								</div>
								<div>
									<h3 className="font-semibold">FSociety</h3>
									<span className="text-gray-400 text-xs">3 minutes ago</span>
								</div>
							</div>

							<span className="font-bold">$48</span>
						</div>
						<div className="py-6 border-b flex gap-6 justify-between items-center">
							<div className="flex gap-3 items-center">
								<div className="w-12 h-12">
									<Image src={avatar} className="rounded-full object-cover" />
								</div>
								<div>
									<h3 className="font-semibold">Geoffrey</h3>
									<span className="text-gray-400 text-xs">30 minutes ago</span>
								</div>
							</div>

							<span className="font-bold">$371</span>
						</div>
						<div className="py-6 flex gap-6 justify-between items-center">
							<div className="flex gap-3 items-center">
								<div className="w-12 h-12">
									<Image src={avatar} className="rounded-full object-cover" />
								</div>
								<div>
									<h3 className="font-semibold">FSociety</h3>
									<span className="text-gray-400 text-xs">1 hour ago</span>
								</div>
							</div>

							<span className="font-bold">$130</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Wallet;
