import Link from "next/link";
import { CiCircleList, CiWallet } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import CardHeader from "../../atoms/Card/header";
import DropdownFilter from "../../atoms/Dropdown/Filter";

const Wallet = () => {
	return (
		<div className="p-2 space-y-6 md:py-8 md:px-6">
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

			<div className="container">
				<div className="bg-white drop-shadow-sm rounded-lg px-3 py-3">
					<div className="flex flex-row-reverse">
						<DropdownFilter
							icon={() => <HiDotsVertical size={24} className="cursor-pointer text-gray-700" />}
							labelClassName="border-none"
							chevronDown={false}
							items={["Delete", "Edit"]}
							dropClassName="!p-0 mt-10 w-28"
						/>
					</div>

					<div className="flex flex-col md:flex-row gap-6 md:items-center justify-between px-6">
						<div className="flex gap-2 items-center">
							<CiWallet size={80} className="text-sky" />
							<div className="text-gray-700">
								<h1 className="font-semibold text-xl">Main Balance</h1>
								<h3 className="font-bold text-3xl">$673,412.66</h3>
							</div>
						</div>

						<div className="text-sm hidden md:block">
							<span className="uppercase">VALID THRU</span>
							<h6 className="text-gray-700">08/21</h6>
						</div>

						<div className="text-sm hidden md:block">
							<span className="uppercase">Card Holder</span>
							<h6 className="text-gray-700">Peter NDENGO</h6>
						</div>

						<h1 className=" text-gray-900 font-semibold">**** **** **** 1234</h1>

						<span class="w-12 hidden md:block"></span>
					</div>

					<div className="px-6 mt-8 space-y-7">
						<div className="w-full bg-gray-200 rounded-full md:h-7">
							<div className="bg-sky text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%] h-full flex items-center justify-center"> 45%</div>
						</div>

						<div className="grid md:grid-cols-2 gap-8 items-center">
							<CardProgress
								color={"text-purple"}
								value={62}
								title={"Installment"}
								amount={"5,412"}
								className={"bg-[#F9F1FC]"}
							/>

							<CardProgress
								color={"text-[#2ABB52]"}
								value={89}
								title={"Investment"}
								amount={"10,916"}
								className={"bg-[#E3F9E9]"}
							/>

							<CardProgress
								color={"text-[#441DE1]"}
								value={41}
								title={"Property"}
								amount={"1,282"}
								className={"bg-[#F4F2FE]"}
							/>

							<Link href={"/learn"} legacyBehavior>
								<button className='border border-sky hover:bg-sky hover:text-white text-sky font-normal h-fit  py-4 md:px-9 px-5 rounded-lg text-lg transition duration-300'>+ New Spends</button>
							</Link>

						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Wallet;

function CardProgress({ color, value, title, amount, className }) {
	return (
		<div className={`${className} py-4 px-4 rounded-lg flex items-center gap-4`}>
			<div className={`radial-progress ${color}`} style={{ "--value": value, "--size": '4rem' }}>{value}%</div>
			<div>
				<h3 className="text-gray-700 font-bold text-sm">{title}</h3>
				<span className="text-sm">${amount}</span>
			</div>
		</div>
	)
}
