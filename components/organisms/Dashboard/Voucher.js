import { CiCircleInfo } from "react-icons/ci";
import { HiUserGroup } from "react-icons/hi";
import ButtonEarn from "../../atoms/Button/Earn";
import WithQR from "../../atoms/Card/Debit/withQR";
import { TabPanel } from "../../atoms/Modal/content";
import { HiCreditCard } from "react-icons/hi2";
import ButtonBuy from "../../atoms/Button/Buy";

const VoucherHome = () => {
	return (
		<div className="p-2 md:pb-8 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
			{/* <div className="md:min-w-5/6 flex">
				<WithQR />
			</div> */}

			<div className="bg-white drop-shadow-sm rounded-xl py-6 px-24 flex flex-col justify-center items-center gap-8 w-full relative">
				<HiCreditCard size={60} className="text-orange" />
				<div className="space-y-3 text-center w-full flex flex-col justify-center items-center">
					<h1 className="text-gray-800 text-lg">Buy a voucher</h1>
					<div className="buy">
						<ButtonBuy href={`/voucher/buy`} title={"Buy now"} className={"text-white py-3 px-4"}/>
					</div>
					<span data-popover-target="popover-description" className="absolute top-1 right-6 cursor-pointer text-gray-700 md:text-gray-400"><CiCircleInfo size={25} /></span>

					<div data-popover id="popover-description" role="tooltip" class="absolute z-50 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 ">
						<div class="p-3 space-y-2 text-left">
							<h3 class="font-semibold text-gray-900 dark:text-white">Description</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit cumque hic sunt nemo fugiat porro, exercitationem commodi velit dolor eos nam sint sapiente iure maxime vitae nisi error autem tempora.
							</p>

							<a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700">Read more <svg class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></a>
						</div>
						<div data-popper-arrow></div>
					</div>
				</div>
			</div>

			<div className="bg-white drop-shadow-sm rounded-xl py-6 px-24 flex flex-col justify-center items-center gap-8 w-full relative">
				<HiUserGroup size={60} className="text-sky" />
				<div className="space-y-3 text-center w-full flex flex-col items-center">
					<h1 className="text-gray-800 text-lg">Invite your friends</h1>
					<ButtonEarn modal={{ title: "Invite your friends" }}></ButtonEarn>
					<span data-popover-target="popover-description" className="absolute top-1 right-6 cursor-pointer text-gray-700 md:text-gray-400"><CiCircleInfo size={25} /></span>

					<div data-popover id="popover-description" role="tooltip" class="absolute z-50 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 ">
						<div class="p-3 space-y-2 text-left">
							<h3 class="font-semibold text-gray-900 dark:text-white">Description</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit cumque hic sunt nemo fugiat porro, exercitationem commodi velit dolor eos nam sint sapiente iure maxime vitae nisi error autem tempora.
							</p>

							<a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700">Read more <svg class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></a>
						</div>
						<div data-popper-arrow></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VoucherHome;
