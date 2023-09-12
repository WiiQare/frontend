import Image from 'next/image';
import Link from 'next/link';
import { CiCircleInfo, CiCircleList } from 'react-icons/ci';
import { IoIosCall } from 'react-icons/io';
import ButtonBuy from '../../atoms/Button/Buy';
import CardHeader from '../../atoms/Card/Header';
import SimpleHeader from '../../atoms/Card/Header/simple';
import { Fragment, useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react';

const DetailsTransaction = ({
  data,
  isLoading,
  isError,
  slug,
  fullname,
  email,
  phone,
}) => {
  const [count, setCount] = useState({ somme: 0, percent: 0, price: 0 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data && !data.code) {
      const somme =
        data &&
        data?.operations.reduce(
          (accumulateur, objet) => accumulateur + objet.amount,
          0,
        );
      const percent = (somme / data?.amount ?? 1) * 100;
      const month = data?.type == 'FEMME ENCEINTE' ? 9 : 12;
      console.log(month);
      const price =
        data?.amount /
        (data?.frequency == 'MONTH'
          ? month
          : data?.week == 'WEEK'
          ? month * 4
          : month * 31);

      setCount({ somme, percent, price });
    }
  }, [data]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  console.log(isLoading, isError, data);

  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6">
      <CardHeader
        title={'Détails Épargne'}
        breadcrumbs={[
          {
            item: 'Épargne',
            link: '/saving',
          },
          {
            item: `#${slug.split('-')[0]}`.toUpperCase(),
            link: `/transactions/${slug}`,
          },
        ]}
        download={false}
        print={false}
      >
        <div className="flex flex-row-reverse gap-4">
          <Link href={`/saving/operation/${slug}`} legacyBehavior>
            <a
              className={`flex items-center gap-2 justify-between rounded-lg bg-orange py-3 text-white px-3 effect-up shadow h-fit`}
            >
              <span className="bg-white text-orange p-1 rounded-md">
                <HiOutlinePlus />
              </span>
              <span className="text-sm font-medium">Récharger le compte</span>
            </a>
          </Link>
        </div>
      </CardHeader>

      {isLoading || isError ? (
        <>Chargement...</>
      ) : (
        <section className="w-full grid md:grid-cols-3 gap-8 items-start pb-20 md:pb-0">
          <div className="w-full overflow-hidden md:col-span-2 rounded-lg py-8 flex flex-col gap-6 bg-white drop-shadow-sm">
            <div className="px-8 space-y-8">
              <div>
                <span className="text-gray-400 text-sm font-normal">
                  ID Épargne
                </span>
                <h2 className="font-semibold text-3xl">
                  #{slug.split('-')[0].toUpperCase()}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="overflow-x-auto">
                  <table className="table table-zebra text-xs w-full flex items-center">
                    <thead>
                      <tr>
                        <th>ID Paiement</th>
                        <th>Méthode de paiement</th>
                        <th>Montant</th>
                        <th>Type opération</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    {!data ||
                    !data?.operations ||
                    data?.operations?.length == 0 ? (
                      //<img src="https://i.goopics.net/z4ix58.png" alt="" className='opacity-60 w-20' />
                      <p className="text-center w-full py-2 text-gray-400 text-md">
                        Aucun versement...
                      </p>
                    ) : (
                      <tbody>
                        {data.operations.map((operation, index) => (
                          <tr key={index}>
                            <th>
                              #
                              {operation.id
                                .split('-')
                                [
                                  operation.id.split('-').length - 1
                                ].toUpperCase()}
                            </th>
                            <td>Carte bancaire</td>
                            <td>
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: operation.currency.toLowerCase(),
                              }).format(operation.amount)}
                            </td>
                            <td>{operation.type}</td>
                            <td className="capitalize">
                              {new Intl.DateTimeFormat('fr', {
                                dateStyle: 'medium',
                              }).format(new Date(operation.createdAt))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
                <span className="w-full bg-gray-100 text-gray-500 h-fit p-2 rounded-lg flex gap-2 items-start text-sm">
                  <div>
                    <CiCircleInfo size={23} className="text-gray-400" />
                  </div>
                  <ul className="leading-6 font-light w-full pr-5 space-y-2">
                    <li className="flex justify-between w-full">
                      Objectif à atteindre:{' '}
                      <span className="text-primary font-bold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: data?.currency?.toLowerCase() ?? 'USD',
                        }).format(data.amount)}
                      </span>
                    </li>

                    <li className="flex justify-between w-full">
                      Cause d'épargne: <span className="">{data.type}</span>
                    </li>
                    <li className="flex justify-between w-full">
                      Frequence de paiement:{' '}
                      <span className="">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: data?.currency?.toLowerCase() ?? 'USD',
                        }).format(count.price.toFixed(2))}{' '}
                        /
                        {data.frequency == 'MONTH'
                          ? 'mois'
                          : data.frequency == 'WEEK'
                          ? 'semaine'
                          : 'jour'}
                      </span>
                    </li>

                    <hr />

                    <li className="flex justify-between w-full">
                      Rester à atteindre:{' '}
                      <span className="font-bold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: data?.currency?.toLowerCase() ?? 'USD',
                        }).format(data.amount - count.somme)}
                      </span>
                    </li>
                  </ul>
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
                    <Image
                      src={`https://ui-avatars.com/api/?uppercase=true&background=random&name=${fullname}&bold=true&color=FFF`}
                      width={50}
                      height={50}
                      className="object-cover w-full h-full rounded-full"
                      alt="Avatar"
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg md:text-2xl text-gray-900">
                      {fullname}
                    </h1>
                    <span className="text-xs md:text-sm text-gray-500">
                      {email}
                    </span>
                  </div>
                </div>

                <Link href={`tel:${phone}`} legacyBehavior>
                  <button className="flex gap-4 items-center border border-sky rounded-lg px-4 py-3 text-sky">
                    <IoIosCall size={40} />
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="font-light">Phone Number</span>
                      <span className="font-bold">{phone}</span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full h-60 m-auto bg-red-100 rounded-xl relative text-white drop-shadow-sm ">
              <img
                className="relative object-cover w-full h-full rounded-xl"
                src="https://i.imgur.com/kGkSg1v.png"
                alt=""
              />

              <div className="w-full px-8 absolute top-6 flex flex-col gap-5">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="font-extralight">{fullname}</p>
                    <h1 className="md:text-3xl font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: data?.currency?.toLowerCase() ?? 'USD',
                      }).format(count.somme)}
                    </h1>
                  </div>
                  <div>
                    <Image
                      alt="logo"
                      className="w-20 h-16 object-contain"
                      src="/images/logo.png"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="pt-1">
                    <p className="font-medium tracking-more-wider text-center">
                      **** **** **** {slug.split('-')[1].toUpperCase()}
                    </p>
                  </div>
                  <div className="pt-5">
                    <div className="flex justify-around">
                      <div className="">
                        <p className="font-extralight text-xs">Date</p>
                        <p className="font-medium tracking-wider text-sm">
                          {new Intl.DateTimeFormat('fr', {
                            dateStyle: 'short',
                          }).format(
                            data?.createdAt
                              ? new Date(data?.createdAt)
                              : new Date(),
                          )}
                        </p>
                      </div>

                      <div className="">
                        <Link href={`/saving/operation/${slug}`} legacyBehavior>
                          <a
                            className={`flex items-center gap-2 justify-between rounded-lg bg-orange py-2 px-3 effect-up shadow`}
                          >
                            <span className="bg-white text-sky p-1 rounded-md">
                              <HiOutlinePlus />
                            </span>
                            <span className="text-sm font-light">
                              Récharger
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg py-4 px-4 flex flex-col gap-6 bg-white drop-shadow-sm">
              <SimpleHeader
                title={'Statistique'}
                describe={'Lorem ipsum dolor sit amet, consectetur'}
              />

              <div className="self-center">
                <div
                  className={`radial-progress ${
                    count.percent <= 50
                      ? 'text-purple'
                      : count.percent > 50 && count.percent <= 75
                      ? 'text-[#2ABB52]'
                      : 'text-[#441DE1]'
                  }`}
                  style={{ '--value': count.percent, '--size': '10rem' }}
                >
                  <span className="text-2xl">{count.percent.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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

          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <div className="fixed inset-0 overflow-y-auto">
              {/* {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>} */}

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
                  <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl space-y-10">
                    <div className="flex flex-col gap-6">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptatibus amet, ex at qui voluptate consequatur iste
                      reprehenderit voluptatum culpa quae vitae, laboriosam
                      minima placeat, odit ullam corrupti sunt suscipit quis?
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DetailsTransaction;
