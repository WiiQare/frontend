import Image from "next/image";
import Link from "next/link";
import { CiCircleInfo, CiCircleList } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import ButtonBuy from "../../atoms/Button/Buy";
import CardHeader from "../../atoms/Card/Header";
import SimpleHeader from "../../atoms/Card/Header/simple";

const DetailsTransaction = () => {
    return (
        <div className="p-2 space-y-6 md:py-8 md:px-6">
            <CardHeader
                title={"Transactions Détails"}
                breadcrumbs={[
                    {
                        item: "Transactions",
                        link: "/transactions"
                    },
                    {
                        item: "#12345",
                        link: "/transactions/12345"
                    }
                ]}
                download={true}
                print={true}
            />

            <section className="w-full grid md:grid-cols-3 gap-8 items-start pb-20 md:pb-0">
                <div className="w-full overflow-hidden md:col-span-2 rounded-lg py-8 flex flex-col gap-6 bg-white drop-shadow-sm">
                    <div className="px-8 space-y-8">
                        <div>
                            <span className="text-gray-400 text-sm font-normal">ID Payment</span>
                            <h2 className="font-semibold text-3xl">#00123521</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="overflow-x-auto">
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
                            <span className="w-full bg-gray-100 text-gray-500 h-fit p-2 rounded-lg flex gap-2 items-start text-sm">
                                <div>
                                    <CiCircleInfo size={23} className="text-gray-400" />
                                </div>
                                <span className="leading-6 font-light">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui veritatis aliquam, sunt odio, voluptate aspernatur molestias illum a, ratione totam sint amet nisi exercitationem culpa dolorem quo enim harum esse!
                                </span>
                            </span>
                        </div>
                    </div>

                    <hr />

                    <div className="px-8 space-y-6">
                        <div>
                            <h3 className="font-semibold text-xl">Recipients</h3>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
                            <div className="flex gap-3 items-center">
                                <div className="w-16 md:w-20">
                                    <Image src={"https://xsgames.co/randomusers/avatar.php?g=male"} width={50} height={50} className="object-cover w-full h-full rounded-full" />
                                </div>
                                <div>
                                    <h1 className="font-semibold text-lg md:text-2xl text-gray-900">Samuel Bro</h1>
                                    <span className="text-xs md:text-sm text-gray-500">frdrcpeter@gmail.com</span>
                                </div>
                            </div>

                            <Link href={"tel:+243814978651"} legacyBehavior>
                                <button className="flex gap-4 items-center border border-sky rounded-lg px-4 py-3 text-sky">
                                    <IoIosCall size={40} />
                                    <div className="flex flex-col gap-1 text-sm">
                                        <span className="font-light">Phone Number</span>
                                        <span className="font-bold">+243 814 978 651</span>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-6">
                    <div className="w-full h-60 m-auto bg-red-100 rounded-xl relative text-white drop-shadow-sm ">

                        <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />

                        <div className="w-full px-8 absolute top-6 flex flex-col gap-5">
                            <div className="flex justify-between">
                                <div className="space-y-1">
                                    <p className="font-extralight">
                                        Peter NDENGO M.
                                    </p>
                                    <h1 className='md:text-3xl font-bold'>$4950.00</h1>
                                </div>
                                <div>
                                    <img className="w-20 h-16 object-contain" src="/images/logo.png" />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <div className="pt-1">
                                    <p className="font-medium tracking-more-wider text-center">
                                        ****  ****  ****  7632
                                    </p>
                                </div>
                                <div className="pt-5">
                                    <div className="flex justify-around">
                                        <div className="">
                                            <p className="font-extralight text-xs">
                                                Date
                                            </p>
                                            <p className="font-medium tracking-wider text-sm">
                                                22/02/15
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="font-extralight text-xs">
                                                Time
                                            </p>
                                            <p className="font-medium tracking-wider text-sm">
                                                03:25
                                            </p>
                                        </div>

                                        <div className="">
                                            <ButtonBuy withIcon={false} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-lg py-4 px-4 flex flex-col gap-6 bg-white drop-shadow-sm">
                        <SimpleHeader title={"Statistic"} describe={"Lorem ipsum dolor sit amet, consectetur"} />

                        <div className="self-center">
			                <div className={`radial-progress text-purple`} style={{ "--value": 85, "--size": '10rem' }}>
                                <span className="text-2xl">85%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DetailsTransaction;
