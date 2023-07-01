import React, { useContext, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { AiOutlineUpload } from "react-icons/ai";
import { TbReceipt } from "react-icons/tb";
import { BiCaretRight } from "react-icons/bi";
import Image from "next/image";
import { useSession } from "next-auth/react";

import avatar from "../../../public/images/femme.png";
import Fetcher from "../../../lib/Fetcher";
import { TransactionContext } from ".";
import "@splidejs/react-splide/css";

const Quickly = () => {
  const { transaction } = useContext(TransactionContext);
  const { data: session } = useSession();
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);

  const { data, isLoading, isError } = Fetcher(
    `/payer/patient?payerId=${session.user.data.userId}`,
    session.user.data.access_token
  );

  console.log("quickly", data);
  return (
    <>
      <div className="grid md:grid-cols-2 gap-3 md:gap-8">
        <div className="bg-gradient-to-r from-sky to-indigo-500 shadow-md rounded-lg p-6 text-white flex items-center gap-7">
          <div className="p-3 bg-white shadow rounded-full">
            <AiOutlineUpload size={30} className="text-sky" />
          </div>

          <h2 className="text-lg font-semibold">Envoyer un pass santé</h2>
        </div>
        <div className="bg-gradient-to-r from-purple to-pink-500 shadow-md rounded-lg p-6 text-white flex items-center gap-7">
          <div className="p-3 bg-white shadow rounded-full">
            <TbReceipt size={30} className="text-purple" />
          </div>

          <h2 className="text-lg font-semibold">Pass santé Envoyer</h2>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 flex flex-col gap-3 md:gap-8 mt-8 w-full">
        <div className="bg-white py-4 px-2 relative drop-shadow-sm rounded-lg space-y-8 w-full md:w-full h-full">
          <div className="flex flex-row gap-6 md:gap-0 md:items-center justify-between px-6">
            <div className="space-y-2">
              <h2 className="font-bold text-xl text-gray-700">
                Mes bénéficiaires
              </h2>
              <span className="text-xs text-gray-500 hidden md:flex">
                Tous les bénéficiaire récement contacté
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="w-full flex flex-col items-center gap-3">
              <span className="text-gray-400 text-xs font-normal">
                Loading...
              </span>
            </div>
          ) : data.length == 0 ? (
            <div className="w-full flex flex-col items-center gap-3">
              <Image
                src="/images/box.png"
                alt="Box image"
                loading="lazy"
                className="h-44 opacity-50"
              />
              <span className="text-gray-400 text-xs font-normal">
                Aucune bénéficiaire actuellement...
              </span>
            </div>
          ) : (
            <>
              <Splide
                hasTrack={false}
                aria-label="Attribution"
                options={{
                  type: "slide",
                  perPage: 2,
                  mediaQuery: "min",
                  breakpoints: {
                    1024: {
                      perPage: 3,
                      gap: 20,
                    },
                  },
                  pagination: false,
                  focus: "center",
                }}
                onActive={(splide, slide) => {
                  if (slide.slideIndex == -1) {
                    setActiveIndexSlide(slide.index);
                  }
                }}
                className="container mx-auto px-8"
              >
                <SplideTrack hasTrack={false}>
                  {data.map((item, index) => (
                    <SplideSlide
                      key={index}
                      className="w-min flex flex-col gap-2 items-center justify-center p-3"
                      onClick={() => null}
                    >
                      <div className="w-20 h-2O relative">
                        <Image
                          src={index % 2 ? avatar : "/images/homme.png"}
                          className="object-cover rounded-xl"
                          width={80}
                          height={80}
                          alt="Home"
                        />
                        <span
                          className={`${
                            activeIndexSlide === index ? "" : "hidden"
                          } p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}
                        >
                          <CiCircleCheck size={18} />
                        </span>
                      </div>

                      <span className="font-semibold text-sm">
                        {item?.firstName} {item?.lastName}
                      </span>
                      <span className="text-xs font-light">
                        {item?.phoneNumber}
                      </span>
                    </SplideSlide>
                  ))}
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
                <h4 className="font-semibold">Montant</h4>
                <form className="w-full">
                  <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Envoyer
                  </label>
                  <div className="relative flex w-full">
                    <input
                      type="number"
                      min={10}
                      id="search"
                      name="amount"
                      className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky focus:border-sky"
                      placeholder="Enter amount"
                      required
                      defaultValue={10}
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-sky hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        <div className="bg-white mb-10 py-4 px-2 relative drop-shadow-sm rounded-lg space-y-8 w-full md:w-full h-full">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:items-center justify-between px-6">
            <div className="space-y-2">
              <h2 className="font-bold text-xl text-gray-700">
                Pass santé Envoyer
              </h2>
              <span className="text-xs text-gray-500">
                Tous les bénéficiaire récement contacté
              </span>
            </div>
          </div>

          <div className="px-6 space-y-3">
            {!transaction.state || !transaction.transaction ? (
              <div className="w-full flex flex-col items-center gap-3">
                <span className="text-gray-400 text-xs font-normal">
                  Loading...
                </span>
              </div>
            ) : transaction?.transaction?.length == 0 ? (
              <div className="w-full flex flex-col items-center gap-3">
                <Image
                  src="/images/box.png"
                  alt="Box image"
                  loading="lazy"
                  className="h-44 opacity-50"
                />
                <span className="text-gray-400 text-xs font-normal">
                  Aucune transaction réalisé actuellement...
                </span>
              </div>
            ) : (
              <>
                {transaction.transaction.map((item, index) => {
                  if (index < 3)
                    return (
                      <div
                        className="pb-6 border-b flex gap-6 justify-between items-center"
                        key={index}
                      >
                        <div className="flex gap-3 items-center">
                          <div className="w-12 h-12">
                            <Image
                              src={avatar}
                              className="rounded-full object-cover"
                              alt="Avatar"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {item.patient?.firstName ??
                                "" + " " + item.patient?.lastName ??
                                ""}
                            </h3>
                            <span className="text-gray-400 text-xs capitalize">
                              <span>
                                {new Intl.DateTimeFormat("fr", {
                                  dateStyle: "full",
                                  timeStyle: "short",
                                }).format(new Date(item.createdAt))}
                              </span>
                            </span>
                          </div>
                        </div>

                        <span className="font-bold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: item.senderCurrency,
                          }).format(item.senderAmount)}
                        </span>
                      </div>
                    );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quickly;
