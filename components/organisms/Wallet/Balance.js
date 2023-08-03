import Link from 'next/link';
import { CiWallet } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import CardProgress from '../../atoms/Card/Progress';
import DropdownFilter from '../../atoms/Dropdown/Filter';

const WalletBalance = ({ wallet, progresses }) => {
    return (
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
                            <h1 className="font-semibold text-xl">Total d'épargne</h1>
                            <h3 className="font-bold text-3xl">${wallet.amount}</h3>
                        </div>
                    </div>

                    <div className="text-sm hidden md:block">
                        <span className="uppercase">DERNIER DÉPÔT</span>
                        <h6 className="text-gray-700">2023 Juin 13</h6>
                    </div>

                    <div className="text-sm hidden md:block">
                        <span className="uppercase">Card Holder</span>
                        <h6 className="text-gray-700">{wallet.holder}</h6>
                    </div>

                    <h1 className=" text-gray-900 font-semibold hidden md:block">{wallet.number}</h1>

                    <span className="w-12 hidden md:block"></span>
                </div>

                <div className="px-6 mt-8 space-y-7">
                    {/* <div className="w-full bg-gray-200 rounded-full md:h-7">
                        <div className={`bg-sky text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[${wallet.progress}%] h-full flex items-center justify-center`}> {wallet.progress}%</div>
                    </div> */}

                    {/* <div className="grid md:grid-cols-2 gap-8 items-center">
                        <CardProgress
                            color={"text-purple"}
                            value={progresses.installment.percent}
                            title={"Pour moi"}
                            amount={progresses.installment.amount}
                            className={"bg-[#F9F1FC]"}
                            link={"/saving/1"}

                        />

                        <CardProgress
                            color={"text-[#2ABB52]"}
                            value={progresses.investment.percent}
                            title={"Pour Famille"}
                            amount={progresses.investment.amount}
                            className={"bg-[#E3F9E9]"}
                            link={"/saving/1"}
                        />

                        <CardProgress
                            color={"text-[#441DE1]"}
                            value={progresses.property.percent}
                            title={"Pour enfant"}
                            amount={progresses.property.amount}
                            className={"bg-[#F4F2FE]"}
                            link={"/saving/1"}
                        />

                        <Link href={"/learn"} legacyBehavior>
                            <button className='border border-sky hover:bg-sky hover:text-white text-sky font-normal h-fit  py-4 md:px-9 px-5 rounded-lg text-lg transition duration-300'>+ Générer un pass santé</button>
                        </Link>

                    </div> */}

                    <div className='flex flex-col justify-center items-center my-10 md:my-20 gap-6'>
                        <img src="https://i.goopics.net/ozsga7.png" alt="" className='md:w-44 w-28 opacity-80'/>
                        <span className='text-gray-400 text-sm'>Aucun épargne actuellement en cours...</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default WalletBalance;
