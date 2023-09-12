import { Fragment, useState } from 'react';
import Image from 'next/image';
import { CiCircleInfo } from 'react-icons/ci';
import CurrencyFlag from 'react-currency-flags';
import ButtonNoAction from '../Button/NoAction';
import { HiOutlineEye } from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react';
import { useQRCode } from 'next-qrcode';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'next/link';
import { BiTransferAlt } from 'react-icons/bi';
import { MdCheck, MdSecurity } from 'react-icons/md';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { sendSMSHash } from '../../../lib/helper';
import LoadingButton from '../Loader/LoadingButton';
import Toast from '../Toast';

const ItemHistory = ({
  stripePaymentId,
  voucherEntity,
  patient,
  currency,
  sender,
  senderAmount,
  senderCurrency,
  voucher,
  createdAt,
  updatedAt,
  ownerType,
  amount,
  paymentMethod,
  status,
  index,
  total,
  accessToken,
}) => {
  const { Canvas } = useQRCode();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTracking, setIsOpenTracking] = useState(false);
  const [state, setState] = useState({ type: 0, message: '' });
  const [copy, setCopy] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalTracking = () => {
    setIsOpenTracking(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openModalTracking = () => {
    setIsOpenTracking(true);
  };

  const SliceText = ({ text }) => {
    return (
      <>
        {text?.slice(0, 8)}...{text?.slice(-7)}
      </>
    );
  };

  const sendSMSMutation = useMutation(sendSMSHash, {
    onSuccess: (res) => {
      console.log(res);
      if (!res.code) {
        setState({ type: 1, message: 'SMS envoyé avec succès' });
        setTimeout(() => {
          setState({ type: 0, message: '' });
        }, 3000);
      } else {
        setState({ type: 2, message: res.message ?? res.description });
        setTimeout(() => {
          setState({ type: 0, message: '' });
        }, 3000);
      }
    },
  });

  const onSubmit = async (values) => {
    sendSMSMutation.mutate({ shortenHash: voucherEntity.shortenHash, accessToken });
  };

  const closeToast = () => {
    setState({ type: 0, message: '' });
  };

  // Formik hook
  const formik = useFormik({
    initialValues: {},
    onSubmit,
  });

  return (
    <div
      tabIndex={index}
      className={`${total > index + 1 ? 'border-b py-3' : ''
        } collapse collapse-arrow  text-gray-700 overflow-scroll md:overflow-hidden`}
    >
      <div className="collapse-title flex gap-7 justify-between items-center ">
        <div className="flex gap-3 items-center">
          <div className="w-16 h-16">
            <Image
              src={`https://ui-avatars.com/api/?uppercase=true&background=CCC&name=${patient?.firstName ?? ''
                }&bold=true&color=FFF`}
              width={200}
              height={200}
              className="object-cover rounded-full w-full h-full"
              alt="avatar"
            />
          </div>
          <div>
            {/* text-xl */}
            <h1 className="font-bold text-sm">
              {patient?.firstName ?? ''} {patient?.lastName ?? ''}
            </h1>
            <span className="text-xs text-sky font-semibold">
              {patient?.phoneNumber ?? ''}
            </span>
          </div>
        </div>

        <div className="flex flex-col text-sm font-medium capitalize">
          <span>
            {new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(
              new Date(createdAt),
            )}
          </span>
          <span>
            {new Intl.DateTimeFormat('fr', { timeStyle: 'short' }).format(
              new Date(createdAt),
            )}
          </span>
        </div>

        <h1 className="font-medium text-md">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: senderCurrency,
          }).format(senderAmount)}
        </h1>
        <h1 className="font-medium text-md">{paymentMethod ?? 'Carte'}</h1>

        {/* <ButtonNoAction
          color={
            status == 0
              ? "orange"
              : status == "success"
              ? "green-500"
              : "gray-300"
          }
          text={
            status == 0 ? "Pending" : status == "success" ? "Succès" : "Echec"
          }
        /> */}

        <button
          onClick={openModal}
          className="font-normal uppercase text-sm p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 flex gap-1 items-center"
        >
          <HiOutlineEye size={20} />{' '}
          <span className="hidden md:flex">Pass santé</span>
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
              {state.type > 0 ? (
                state.type == 2 ? (
                  <Toast
                    type={'danger'}
                    message={state.message}
                    close={closeToast}
                  />
                ) : state.type == 1 ? (
                  <Toast
                    type={'success'}
                    message={state.message}
                    close={closeToast}
                  />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
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
                    <Dialog.Title
                      as="div"
                      className="flex justify-between items-center"
                    >
                      <h3 className="text-md font-semibold leading-6 text-gray-900">
                        Pass Santé{' '}
                        <span className="text-orange">#000{voucher.id}</span>
                      </h3>
                    </Dialog.Title>

                    <div className="flex flex-col gap-6 justify-center items-center">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <span className="text-xs flex items-center gap-1">
                          {' '}
                          Pass santé ID:
                          <CopyToClipboard
                            text={voucherEntity.voucherHash}
                            onCopy={() => {
                              setCopy(true);
                              setTimeout(() => {
                                setCopy(false);
                              }, 2000);
                            }}
                          >
                            <div className="flex items-center gap-1">
                              [
                              <div
                                className="tooltip"
                                data-tip={
                                  !copy
                                    ? 'Copier sur le presse papier'
                                    : '✓ Copié'
                                }
                              >
                                <span className="text-orange cursor-pointer">
                                  <SliceText text={voucherEntity.voucherHash} />
                                </span>
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
                            text={`${voucherEntity.voucherHash}`}
                            options={{
                              level: 'M',
                              margin: 1,
                              scale: 5,
                              quality: 100,
                              color: {
                                dark: '#000',
                                light: '#FFF',
                              },
                            }}
                          />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div className="flex -space-x-2">
                            <Image
                              className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white"
                              src="/images/homme.png"
                              alt="Image Description"
                              width={80}
                              height={80}
                            />
                            <Image
                              className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white"
                              src="/images/femme.png"
                              alt="Image Description"
                              width={80}
                              height={80}
                            />
                          </div>

                          <h4 className="text-sm text-center">
                            <span className="flex items-center justify-center gap-2">
                              <span className="font-semibold flex items-center gap-1">
                                <CurrencyFlag
                                  currency={currency}
                                  className="rounded-full !h-4 !w-4 object-cover"
                                />{' '}
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency,
                                }).format(amount)}
                              </span>
                              Pass santé WiiQare
                            </span>
                            de{' '}
                            <span className="text-orange font-semibold">
                              {sender.firstName}
                            </span>{' '}
                            à{' '}
                            <span className="text-orange font-semibold">
                              {patient?.firstName ?? ''}
                            </span>
                          </h4>
                        </div>
                      </div>

                      <div className="text-center mt-6 flex flex-col gap-2 space-y-3">
                        <h4 className="font-semibold text-gray-700 text-sm">
                          Envoyer le pass santé au bénéficiaire :
                        </h4>
                        <div className="flex justify-between">
                          <Link
                            href={`whatsapp://send?text=https://wiiqare-app.com/voucher/pass/${stripePaymentId}`}
                            legacyBehavior
                            target={'_blank'}
                          >
                            <a className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
                              <img
                                src="/images/whatsapp.png"
                                alt=""
                                className="w-6"
                              />
                              <span className="hidden md:flex">WhatsApp</span>
                            </a>
                          </Link>

                          <Link
                            href={`https://www.facebook.com/share.php?u=https://wiiqare-app.com/voucher/pass/${stripePaymentId}`}
                            legacyBehavior
                            target={'_blank'}
                          >
                            <a className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
                              <img
                                src="/images/facebook-share.png"
                                alt=""
                                className="w-6"
                              />
                              <span className="hidden md:flex">Facebook</span>
                            </a>
                          </Link>

                          <button
                            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2"
                            onClick={formik.handleSubmit}
                          >
                            <img src="/images/sms.png" alt="" className="w-6" />
                            {sendSMSMutation.isLoading ? (
                              <LoadingButton />
                            ) : (
                              <span className="hidden md:flex">Message</span>
                            )}
                          </button>

                          <CopyToClipboard
                            text={`https://wiiqare-app.com/voucher/pass/${stripePaymentId}`}
                            onCopy={() => {
                              setCopyLink(true);
                              setTimeout(() => {
                                setCopyLink(false);
                              }, 2000);
                            }}
                          >
                            <button
                              type="button"
                              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2"
                            >
                              <img
                                src="/images/text.png"
                                alt=""
                                className="w-6"
                              />
                              <span className="hidden md:flex">
                                {!copyLink
                                  ? 'Copier le lien'
                                  : 'Copié avec succès'}
                              </span>
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
                <td>
                  {new Intl.DateTimeFormat('fr', { dateStyle: 'full' }).format(
                    new Date(createdAt),
                  )}
                </td>
                <td className="flex gap-1 items-center">
                  <CurrencyFlag
                    currency={currency}
                    className="rounded-full !h-4 !w-4 object-cover"
                  />{' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency,
                  }).format(amount)}
                </td>
                <td>
                  <div
                    onClick={openModalTracking}
                    type="button"
                    className="cursor-pointer"
                    title="Voir Tracking Security"
                  >
                    <span className="!bg-green-400 text-white w-min h-min py-1 px-2 rounded-full flex items-center gap-1">
                      <MdSecurity
                        className="!text-white"
                        color="#fff"
                        style={{ color: '#fff' }}
                      />{' '}
                      Pass Santé Généré
                    </span>
                  </div>

                  <Transition appear show={isOpenTracking} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-50"
                      onClose={closeModalTracking}
                    >
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
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl space-y-8">
                              <Dialog.Title
                                as="div"
                                className="flex gap-2 items-center"
                              >
                                <MdSecurity
                                  size={17}
                                  className="text-gray-600"
                                />
                                <h3 className="text-md font-semibold leading-6 text-gray-900">
                                  Sécurité &{' '}
                                  <span className="text-orange"> Suivi</span>
                                </h3>
                              </Dialog.Title>

                              <div className="px-8 space-y-8">
                                <div className="space-y-4">
                                  <div className="flex gap-4 items-center px-5 justify-center">
                                    <img
                                      className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800"
                                      src="/images/homme.png"
                                      alt="Image Description"
                                    />
                                    <BiTransferAlt
                                      size={30}
                                      className="text-gray-400"
                                    />
                                    <img
                                      className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800"
                                      src="/images/femme.png"
                                      alt="Image Description"
                                    />
                                  </div>

                                  <span className="text-xs flex justify-center items-center gap-1">
                                    Pass Sante ID:
                                    <CopyToClipboard
                                      text={voucherEntity.voucherHash}
                                      onCopy={() => {
                                        setCopy(true);
                                        setTimeout(() => {
                                          setCopy(false);
                                        }, 2000);
                                      }}
                                    >
                                      <div className="flex items-center gap-1">
                                        [
                                        <div
                                          className="tooltip"
                                          data-tip={
                                            !copy
                                              ? 'Copy to clipboard'
                                              : '✓ Copy'
                                          }
                                        >
                                          <span className="text-orange cursor-pointer">
                                            <SliceText
                                              text={
                                                '0xf59b12eccfc5faedbc4657bd593d6d6a0c679623'
                                              }
                                            />
                                          </span>
                                        </div>
                                        ]
                                      </div>
                                    </CopyToClipboard>
                                  </span>

                                  <h4 className="text-sm text-center">
                                    <span className="flex items-center justify-center gap-2">
                                      <span className="font-semibold flex items-center gap-1">
                                        <CurrencyFlag
                                          currency={currency}
                                          className="rounded-full !h-4 !w-4 object-cover"
                                        />{' '}
                                        {new Intl.NumberFormat('en-US', {
                                          style: 'currency',
                                          currency,
                                        }).format(amount)}
                                      </span>
                                      Pass santé WiiQare
                                    </span>
                                    de{' '}
                                    <span className="text-orange font-semibold">
                                      {sender.firstName}
                                    </span>{' '}
                                    à{' '}
                                    <span className="text-orange font-semibold">
                                      {patient?.firstName ?? ''}
                                    </span>
                                  </h4>
                                </div>

                                <ol className="relative border-l border-gray-200">
                                  <li className="mb-10 ml-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-400 rounded-full -left-3 ring-8 ring-white">
                                      <MdCheck
                                        className="!text-white"
                                        color="#fff"
                                        style={{ color: '#fff' }}
                                      />
                                    </span>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                      Transfert Créer{' '}
                                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                                        Début
                                      </span>
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                      {new Intl.DateTimeFormat('fr', {
                                        dateStyle: 'long',
                                      }).format(new Date(createdAt))}
                                    </time>
                                  </li>
                                  <li className="mb-10 ml-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-400 rounded-full -left-3 ring-8 ring-white">
                                      <MdCheck
                                        className="!text-white"
                                        color="#fff"
                                        style={{ color: '#fff' }}
                                      />
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                      Traitement WiiQare
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                      {new Intl.DateTimeFormat('fr', {
                                        dateStyle: 'long',
                                      }).format(new Date(createdAt))}
                                    </time>
                                  </li>
                                  <li className="ml-6 mb-10">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-400 rounded-full -left-3 ring-8 ring-white">
                                      <MdCheck
                                        className="!text-white"
                                        color="#fff"
                                        style={{ color: '#fff' }}
                                      />
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                      Pass Santé Généré
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                      {new Intl.DateTimeFormat('fr', {
                                        dateStyle: 'long',
                                      }).format(new Date(createdAt))}
                                    </time>
                                  </li>

                                  <li className="ml-6">
                                    <span
                                      className={`absolute flex items-center justify-center w-6 h-6 ${ownerType == 'PROVIDER'
                                          ? 'bg-green-400'
                                          : 'bg-gray-200'
                                        } rounded-full -left-3 ring-8 ring-white`}
                                    >
                                      {ownerType == 'PROVIDER' && (
                                        <MdCheck
                                          className="!text-white"
                                          color="#fff"
                                          style={{ color: '#fff' }}
                                        />
                                      )}
                                    </span>
                                    <h3
                                      className={`mb-1 text-lg font-semibold ${ownerType == 'PROVIDER'
                                          ? 'text-gray-900'
                                          : 'text-gray-400'
                                        }`}
                                    >
                                      Utilisation du Pass santé
                                    </h3>
                                    <time
                                      className={`block mb-2 text-sm font-normal leading-none ${ownerType == 'PROVIDER'
                                          ? 'text-gray-400'
                                          : 'text-gray-200'
                                        } `}
                                    >
                                      {ownerType == 'PROVIDER'
                                        ? new Intl.DateTimeFormat('fr', {
                                          dateStyle: 'long',
                                        }).format(new Date(updatedAt))
                                        : 'En cours ...'}
                                    </time>
                                  </li>
                                </ol>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span className="w-52 bg-gray-200 h-fit p-2 rounded-lg flex items-center gap-2 text-sm text-gray-600">
          <span
            className="tooltip tooltip-bottom text-xs"
            data-tip="Le pass santé peut être déclarer avant d'être présenté à un fournisseur de soins de santé partenaire de WiiQare"
          >
            <CiCircleInfo size={23} className="text-gray-400" />
          </span>{' '}
          {voucher.status}
        </span>
      </div>
    </div>
  );
};

export default ItemHistory;
