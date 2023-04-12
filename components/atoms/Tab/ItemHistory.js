import Image from 'next/image';
import { CiCircleInfo } from 'react-icons/ci';

import ButtonNoAction from '../Button/NoAction';
import Link from 'next/link';

const ItemHistory = ({stripePaymentId, transactionHash, currency, voucher, email, createdAt, amount, paymentMethod, status, value, index, total}) => {

    return (
        <div tabIndex={index} className={`${total > index + 1 ? "border-b py-3" : ""} collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden`}>
            <div className="collapse-title flex gap-7 justify-between items-center ">
                <div className="flex gap-3 items-center">
                    <div className="w-16 h-16">
                        <Image src={"https://xsgames.co/randomusers/avatar.php?g=male"} width={50} height={50} className="object-cover rounded-full w-full h-full" />
                    </div>
                    <div>
                        {/* text-xl */}
                        <h1 className="font-bold text-sm">{voucher.patientId}</h1>
                        <span className="text-xs text-sky font-semibold">{email}</span>
                    </div>
                </div>

                <div className="flex flex-col text-sm font-medium">
                    <span>{new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(new Date(createdAt))}</span>
                    <span>{new Intl.DateTimeFormat('fr', {timeStyle: 'short' }).format(new Date(createdAt))}</span>
                </div>

                <h1 className="font-bold text-lg">{currency == "usd" ? "$" : "£"}{amount}</h1>
                <h1 className="font-bold text-lg">{paymentMethod ?? "Stripe"}</h1>

                <ButtonNoAction
                    color={status == 0 ? 'orange' : status == "succes" ? "[#2BC155]" : "gray-300"}
                    text={status == 0 ? 'Pending' : status == 'success' ? "Completed" : "Cancel"}
                />

                <Link href={`/transactions/${transactionHash}`} legacyBehavior>
                    <a className='font-semibold uppercase text-sm p-2 rounded-lg hover:bg-gray-300 transition-all duration-200'>Voir Détails</a>
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
                                <th>#{stripePaymentId}</th>
                                <td>Stripe</td>
                                <td>{new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(new Date(createdAt))}</td>
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
    );
}

export default ItemHistory;