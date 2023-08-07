import React, { useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "country-data";
import CurrencyFlag from "react-currency-flags";
import { HiArrowSmLeft } from "react-icons/hi";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripePayment = ({ plan }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [methodPayment, setMethodPayment] = useState("card");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/saving", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "ok",
        month: 12
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "flat",
    labels: "floating",
    rules: {
      ".Error": {
        fontSize: "10px",
      },
      ".Label": {
        fontSize: "10px",
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret ? (
        <div className="flex justify-center w-full  py-10 items-end bg-white rounded-lg border">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="px-4 pt-8">
              <div className="flex gap-2 items-center mb-3">
                <button
                  className="border border-gray-300 rounded-xl py-1 px-2 hover:bg-gray-200"
                  type="button"
                  onClick={null}
                >
                  <HiArrowSmLeft size={24} />
                </button>
                <p className="text-xl font-medium">Détails de l'épargne</p>
              </div>
              <p className="text-gray-400 text-xs">
                Confirmer les informations et choisissez la methode de paiement
              </p>

              <div className="items-center sm:flex w-full">
                <div className="py-5 w-full">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                    <a href="#">
                      Épargne Famille 
                    </a>
                  </h3>
                  <span className="text-gray-500 ">
                    Sur un total de 12 Mois 
                  </span>
                  <p className="mt-3 mb-4 font-light text-gray-500 w-full">
                    <ul className="flex flex-col gap-1 w-full text-sm">
                      <li className="flex justify-between w-full">
                        Objectif:{" "}
                        <b className="text-orange">
                          $ 4000.00
                        </b>
                      </li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Devise d&apos;épargne
                  </p>
                  <p className="font-normal text-sm text-gray-600">
                    USD
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Frais WiiQare
                  </p>
                  <p className="font-normal text-sm text-gray-600">0%</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-b pb-6">
                <p className="text-sm font-medium text-gray-900">
                  Premier paiement
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  $ 300.00
                </p>
              </div>

              <p className="mt-8 text-lg font-medium">Modes de paiement</p>
              <form className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    checked={methodPayment == "card" ? true : false}
                    onClick={() => setMethodPayment("card")}
                  />
                  <span className="peer-checked:border-orange absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-orange peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    for="radio_1"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/carte-bancaire.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Carte Bancaire</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Visa & Mastercard
                      </p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    checked={methodPayment != "card" ? true : false}
                    onClick={() => setMethodPayment("crypto")}
                  />
                  <span className="peer-checked:border-orange absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-orange peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    for="radio_2"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/crypto-monnaie.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Crypto Monnaie</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Ethereum (ETH) & Bitcoin (BTC)
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>

            <div className="mt-6 bg-gray-50 px-4 pt-8 lg:mt-0 rounded-xl">
              {methodPayment == "card" ? (
                <>
                  <p className="text-xl font-medium">Informations Bancaire</p>
                  <p className="text-gray-400 text-xs mb-4">
                    Completez vos informations bancaire
                  </p>

                  <div>
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm
                        amount={400}
                        email={""}
                      />
                    </Elements>
                  </div>
                </>
              ) : (
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <img
                    src="/images/maintenance.png"
                    alt="Maintenace"
                    className="w-40 opacity-60"
                  />
                  <p className="text-gray-500 text-sm">
                    Service indisponible actuellement...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoaderStripe />
      )}
    </>
  );
};

export default StripePayment;

function LoaderStripe() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
