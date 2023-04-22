import Image from 'next/image';
import { CiCircleInfo } from 'react-icons/ci';

import ButtonNoAction from '../Button/NoAction';
import Link from 'next/link';

const ItemHistory = ({stripePaymentId, transactionHash, patient, currency, senderAmount, senderCurrency, voucher, email, createdAt, amount, paymentMethod, status, value, index, total}) => {

    return (
        <div tabIndex={index} className={`${total > index + 1 ? "border-b py-3" : ""} collapse collapse-arrow text-gray-700 overflow-scroll md:overflow-hidden`}>
            <div className="collapse-title flex gap-7 justify-between items-center ">
                <div className="flex gap-3 items-center">
                    <div className="w-16 h-16">
                        <Image src={`https://ui-avatars.com/api/?uppercase=true&background=CCC&name=${patient.firstName}&bold=true&color=FFF`} width={200} height={200} className="object-cover rounded-full w-full h-full" />
                    </div>
                    <div>
                        {/* text-xl */}
                        <h1 className="font-bold text-sm">{patient.firstName} {patient.lastName}</h1>
                        <span className="text-xs text-sky font-semibold">{patient.phoneNumber}</span>
                    </div>
                </div>

                <div className="flex flex-col text-sm font-medium">
                    <span>{new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(new Date(createdAt))}</span>
                    <span>{new Intl.DateTimeFormat('fr', {timeStyle: 'short' }).format(new Date(createdAt))}</span>
                </div>

                <h1 className="font-bold text-lg">{new Intl.NumberFormat("en-US", {style: 'currency', currency: senderCurrency}).format(senderAmount)}</h1>
                <h1 className="font-bold text-lg">{paymentMethod ?? "Stripe"}</h1>

                <ButtonNoAction
                    color={status == 0 ? 'orange' : status == "succes" ? "[#2BC155]" : "gray-300"}
                    text={status == 0 ? 'Pending' : status == 'success' ? "Succès" : "Echec"}
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
                                <th>Montant réçu</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>#{voucher.id}</th>
                                <td>Stripe</td>
                                <td>{new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(new Date(createdAt))}</td>
                                <td>{new Intl.NumberFormat("en-US", {style: 'currency', currency}).format(amount)}</td>
                                <td>
                                    <div>
                                    
                                    {
                                        status == "success" ? (

                                            <span className="bg-green-400 text-white w-min h-min py-1 px-2 rounded-full">Succès</span>
                                        ): (
                                            <span className="bg-red-400 w-min h-min py-1 px-2 rounded-full">Echec</span>
                                        )
                                    }
                                    </div>
                                    </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm font-bold text-gray-600">
                    <CiCircleInfo size={30} className="text-gray-400" /> {voucher.status}
                </span>
            </div>
        </div>
    );
}

export default ItemHistory;