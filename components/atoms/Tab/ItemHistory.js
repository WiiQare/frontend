import { Fragment, useState } from 'react'
import Image from 'next/image';
import { CiCircleInfo } from 'react-icons/ci';
import CurrencyFlag from 'react-currency-flags';
import ButtonNoAction from '../Button/NoAction';
import { HiOutlineEye } from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react'
import { useQRCode } from "next-qrcode";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from "next/link";



const ItemHistory = ({ stripePaymentId, transactionHash, patient, currency, sender, senderAmount, senderCurrency, voucher, email, createdAt, amount, paymentMethod, status, value, index, total }) => {
    console.log(status);
    const { Canvas } = useQRCode();
    const [isOpen, setIsOpen] = useState(false);
    const [copy, setCopy] = useState(false);
    const [copyLink, setCopyLink] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const SliceText = ({ text }) => {
        return <>{text.slice(0, 8)}...{text.slice(-7)}</>
    }

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

                <div className="flex flex-col text-sm font-medium capitalize">
                    <span>{new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(new Date(createdAt))}</span>
                    <span>{new Intl.DateTimeFormat('fr', { timeStyle: 'short' }).format(new Date(createdAt))}</span>
                </div>

                <h1 className="font-medium text-md">{new Intl.NumberFormat("en-US", { style: 'currency', currency: senderCurrency }).format(senderAmount)}</h1>
                <h1 className="font-medium text-md">{paymentMethod ?? "Carte"}</h1>

                <ButtonNoAction
                    color={status == 0 ? 'orange' : status == "success" ? "green-500" : "gray-300"}
                    text={status == 0 ? 'Pending' : status == 'success' ? "Succès" : "Echec"}
                />

                <button onClick={openModal} className='font-normal uppercase text-sm p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 flex gap-1 items-center'>
                    <HiOutlineEye size={20} /> <span className='hidden md:flex'>Pass santé</span> 
                </button>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-3xl p-6 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl space-y-8">
                                        <Dialog.Title as="div" className="flex justify-between items-center">
                                            <h3 className="text-md font-semibold leading-6 text-gray-900">
                                                Pass Santé <span className='text-orange'>#000{voucher.id}</span>
                                            </h3>
                                        </Dialog.Title>

                                        <div className="flex flex-col gap-6 justify-center items-center">
                                            <div className="flex flex-col items-center text-center space-y-2">
                                               
                                                <span className="text-xs flex items-center gap-1"> Pass santé ID:
                                                    <CopyToClipboard text={transactionHash} onCopy={() => {
                                                        setCopy(true); setTimeout(() => {
                                                            setCopy(false)
                                                        }, 2000);
                                                    }}>
                                                        <div className="flex items-center gap-1">
                                                            [
                                                            <div className="tooltip" data-tip={!copy ? "Copier sur le presse papier" : "✓ Copié"}>
                                                                <span className="text-orange cursor-pointer"><SliceText text={transactionHash} /></span>
                                                            </div>
                                                            ]
                                                        </div>
                                                    </CopyToClipboard>
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-center gap-4">

                                                <div className="border relative border-gray-300 rounded-lg overflow-hidden">
                                                    <Canvas
                                                        className="w-full"
                                                        text={`${transactionHash}`}
                                                        options={{
                                                            level: "M",
                                                            margin: 1,
                                                            scale: 5,
                                                            quality: 100,
                                                            color: {
                                                                dark: "#000",
                                                                light: "#FFF",
                                                            },
                                                        }}
                                                    />

                                                </div>

                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex -space-x-2">
                                                        <img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/homme.png" alt="Image Description" />
                                                        <img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/femme.png" alt="Image Description" />
                                                    </div>

                                                    <h4 className="text-sm text-center">
                                                        <span className="flex items-center justify-center gap-2">
                                                            <span className="font-semibold flex items-center gap-1">
                                                                <CurrencyFlag currency={currency} className="rounded-full !h-4 !w-4 object-cover" /> {new Intl.NumberFormat("en-US", { style: 'currency', currency }).format(amount)}</span>
                                                            Pass santé WiiQare
                                                        </span>
                                                        de <span className="text-orange font-semibold">{sender.firstName}</span> à <span className="text-orange font-semibold">{patient.firstName}</span></h4>
                                                </div>
                                            </div>

                                            <div className="text-center mt-6 flex flex-col gap-2 space-y-3">
                                                <h4 className="font-semibold text-gray-700 text-sm">Envoyer le pass santé au bénéficiaire :</h4>
                                                <div className="flex justify-between">
                                                    <Link href={`whatsapp://send?text=https://wiiqare-app.com/voucher/pass/${stripePaymentId}`} legacyBehavior target={"_blank"}>
                                                        <a className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
                                                            <img src="/images/whatsapp.png" alt="" className="w-6" />
                                                            <span className="hidden md:flex">WhatsApp</span>
                                                        </a>
                                                    </Link>

                                                    <Link href={`https://www.facebook.com/share.php?u=https://wiiqare-app.com/voucher/pass/${stripePaymentId}`} legacyBehavior target={"_blank"}>
                                                        <a className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
                                                            <img src="/images/facebook-share.png" alt="" className="w-6" />
                                                            <span className="hidden md:flex">Facebook</span>
                                                        </a>
                                                    </Link>

                                                    <Link href={`sms://+243814978651&?body=https://wiiqare-app.com/voucher/pass/${stripePaymentId}`} legacyBehavior target={"_blank"}>
                                                        <a className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
                                                            <img src="/images/sms.png" alt="" className="w-6" />
                                                            <span className="hidden md:flex">Message</span>
                                                        </a>
                                                    </Link>

                                                    <CopyToClipboard text={`https://wiiqare-app.com/voucher/pass/${stripePaymentId}`} onCopy={() => {
                                                        setCopyLink(true); setTimeout(() => {
                                                            setCopyLink(false)
                                                        }, 2000);
                                                    }}>
                                                        <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
                                                            <img src="/images/text.png" alt="" className="w-6" />
                                                            <span className="hidden md:flex">{!copyLink ? "Copier le lien" : "Copié avec succès"}</span>
                                                        </button>
                                                    </CopyToClipboard>
                                                </div>
                                            </div>
                                        </div>


                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <div className="collapse-content flex gap-4">
                <div className="overflow-x-auto w-5/6">
                    <table className="table table-zebra text-xs w-full">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Methode de paiement</th>
                                <th>Date</th>
                                <th>Montant réçu</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>#000{voucher.id}</th>
                                <td>Carte Bancaire</td>
                                <td>{new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(new Date(createdAt))}</td>
                                <td className='flex gap-1 items-center'><CurrencyFlag currency={currency} className="rounded-full !h-4 !w-4 object-cover" /> {new Intl.NumberFormat("en-US", { style: 'currency', currency }).format(amount)}</td>
                                <td>
                                    <div>

                                        {
                                            status == "success" ? (

                                                <span className="bg-green-400 text-white w-min h-min py-1 px-2 rounded-full">Succès</span>
                                            ) : (
                                                <span className="bg-red-400 w-min h-min py-1 px-2 rounded-full">Echec</span>
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                    <span className='tooltip tooltip-bottom text-xs' data-tip="Le Health Pass peut être échangé lorsqu'il est présenté à un fournisseur de soins de santé partenaire de WiiQare"><CiCircleInfo size={23} className="text-gray-400" /></span> {voucher.status}
                </span>
            </div>
        </div>
    );
}

export default ItemHistory;