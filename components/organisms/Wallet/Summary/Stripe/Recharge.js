import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'country-data';
import CurrencyFlag from 'react-currency-flags';
import { HiArrowSmLeft } from 'react-icons/hi';
import Image from 'next/image';
import { DrawContext } from '../../../../../pages/_app';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { addPlan, saveOperation } from '../../../../../lib/helper';
import { useMutation } from 'react-query';
import LoadingButton from '../../../../atoms/Loader/LoadingButton';
import { useRouter } from 'next/router';
import Fetcher from '../../../../../lib/Fetcher';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  {
    locale: 'fr-FR'
  }
);

const StripePaymentRecharge = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [state, setState] = useState({ type: 0, message: '' });
  const [count, setCount] = useState({ price: 0 });
  const [methodPayment, setMethodPayment] = useState('card');
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isLoading, isError } = Fetcher(
    `/savings/details/${router.query.saving}`,
    session.user.data.access_token,
  );

  useEffect(() => {
    //   // Create PaymentIntent as soon as the page loads
    //   fetch('/api/saving', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       amount: saving.plan.amount,
    //       currency: saving.plan.currency,
    //       idSaving: saving.idSaving,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setClientSecret(data.clientSecret));

    if (data && !data.code) {
      const month = data?.type == 'FEMME ENCEINTE' ? 9 : 12;
      const price =
        data?.amount /
        (data?.frequency == 'MONTH'
          ? month
          : data?.week == 'WEEK'
            ? month * 4
            : month * 31);

      setCount({ price });
    }
  }, [data]);

  // const appearance = {
  //   theme: 'flat',
  //   labels: 'floating',
  //   rules: {
  //     '.Error': {
  //       fontSize: '10px',
  //     },
  //     '.Label': {
  //       fontSize: '10px',
  //     },
  //   },
  // };

  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  const newPlan = useMutation(saveOperation, {
    onSuccess: (res) => {
      if (res.code) {
        setState({ type: 2, message: res.message ?? res.description });
        setTimeout(() => {
          setState({ type: 0, message: '' });
        }, 3000);
      } else {
        router.push('/saving/done?redirect_status=succeeded');
      }
    },
  });

  const summaryPage = () => {
    newPlan.mutate({
      amount: count.price.toFixed(2),
      currency: data.currency,
      saving: router.query.saving,
      type: 'CREDIT',
      accessToken: session.accessToken,
    });
  };

  if (!router.query.saving)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <Image
          src="https://i.goopics.net/s7t0br.png"
          className="w-40 opacity-80"
          alt="empty"
          width={512}
          height={512}
        />
        <span className="text-xs text-gray-600">
          {
            "Aucun objectif n'a été défini, le premier paiement n'est pas possible..."
          }
        </span>
      </div>
    );

  return (
    <>
      {!clientSecret && !isLoading ? (
        <div className="flex justify-center w-full  py-10 items-end bg-white rounded-lg border">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="px-4 pt-8">
              <Link href={'/saving/new'} legacyBehavior>
                <div className="flex gap-2 items-center mb-3">
                  <button
                    className="border border-gray-300 rounded-xl py-1 px-2 hover:bg-gray-200"
                    type="button"
                  >
                    <HiArrowSmLeft size={24} />
                  </button>
                  <p className="text-xl font-medium">
                    {"Détails de l'épargne"}
                  </p>
                </div>
              </Link>
              <p className="text-gray-400 text-xs">
                Confirmer les informations et choisissez la methode de paiement
              </p>

              <div className="items-center sm:flex w-full">
                <div className="py-5 w-full">
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 ">
                    <a href="#">
                      Épargne -{' '}
                      <span className="text-orange font-bold capitalize">
                        {data.type}
                      </span>
                    </a>
                  </h3>
                  <span className="text-gray-500 ">
                    Sur un total de {data.type == 'FEMME ENCEINTE' ? 9 : 12}{' '}
                    Mois
                  </span>
                  <p className="mt-3 mb-4 font-light text-gray-500 w-full">
                    <ul className="flex flex-col gap-1 w-full text-sm">
                      <li className="flex justify-between w-full">
                        Objectif:{' '}
                        <b className="text-orange">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: data.currency,
                          }).format(data.amount)}
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
                    {data.currency}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Fréquence de paiement
                  </p>
                  <p className="font-normal text-sm text-gray-600">
                    {data.frequency == 'DAY'
                      ? 'Journalier'
                      : data.frequency == 'WEEK'
                        ? 'Hebdomadaire'
                        : data.frequency == 'MONTH'
                          ? 'Mensuel'
                          : '---'}
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
                <p className="text-sm font-medium text-gray-900">Paiement</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: data.currency,
                  }).format(count.price)}
                </p>
              </div>

              <p className="mt-8 text-lg font-medium">Modes de paiement</p>
              <form className="mt-5 grid gap-6">
                <div
                  className="relative"
                  onClick={() => setMethodPayment('card')}
                >
                  <span
                    className={`${methodPayment == 'card' ? 'border-orange' : ''
                      } absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white`}
                  ></span>
                  <label
                    className={`${methodPayment == 'card'
                      ? 'border-2 border-orange peer-checked:bg-gray-50'
                      : ''
                      } flex cursor-pointer select-none rounded-lg border border-gray-300 p-4`}
                    for="radio_1"
                  >
                    <Image
                      className="w-14 object-contain"
                      src="/images/carte-bancaire.png"
                      alt=""
                      width={512}
                      height={512}
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Carte Bancaire</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Visa & Mastercard
                      </p>
                    </div>
                  </label>
                </div>
                <div
                  className="relative"
                  onClick={() => setMethodPayment('crypto')}
                >
                  <span
                    className={`${methodPayment == 'crypto' ? 'border-orange' : ''
                      } absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white`}
                  ></span>
                  <label
                    className={`${methodPayment == 'crypto'
                      ? 'border-2 border-orange peer-checked:bg-gray-50'
                      : ''
                      } flex cursor-pointer select-none rounded-lg border border-gray-300 p-4`}
                    for="radio_2"
                  >
                    <Image
                      className="w-14 object-contain"
                      src="/images/crypto-monnaie.png"
                      alt=""
                      width={512}
                      height={512}
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Crypto Monnaie</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Ethereum (ETH) & Bitcoin (BTC)
                      </p>
                    </div>
                  </label>
                </div>

                {data.currency != 'EUR' ? (
                  <div
                    className="relative"
                    onClick={() => setMethodPayment('mobile')}
                  >
                    <span
                      className={`${methodPayment == 'mobile' ? 'border-orange' : ''
                        } absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white`}
                    ></span>
                    <label
                      className={`${methodPayment == 'mobile'
                        ? 'border-2 border-orange peer-checked:bg-gray-50'
                        : ''
                        } flex cursor-pointer select-none rounded-lg border border-gray-300 p-4`}
                      for="radio_3"
                    >
                      <Image
                        className="w-14 object-contain"
                        src="https://i.goopics.net/com9rd.png"
                        alt=""
                        width={512}
                        height={512}
                      />
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">Mobile Money</span>
                        <p className="text-slate-500 text-sm leading-6">
                          Mpesa, Orange & Airtel Money
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </div>

            <div className="mt-6 bg-gray-50 px-4 pt-8 lg:mt-0 rounded-xl">
              {methodPayment == 'card' ? (
                <>
                  <p className="text-xl font-medium">Informations Bancaire</p>
                  <p className="text-gray-400 text-xs mb-4">
                    Completez vos informations bancaire
                  </p>

                  <div>
                    {/* <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm amount={400} email={''} />
                    </Elements> */}

                    <button
                      type="submit"
                      onClick={() => summaryPage()}
                      className="mb-8 w-full rounded-md bg-orange effect-up px-6 py-4 font-medium text-white"
                    >
                      {newPlan.isLoading ? (
                        <LoadingButton />
                      ) : (
                        'Procéder au paiement'
                      )}
                    </button>
                  </div>
                </>
              ) : methodPayment == 'crypto' ? (
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
              ) : (
                <>
                  <p className="text-xl font-medium">
                    Informations Mobile Money
                  </p>
                  <p className="text-gray-400 text-xs mb-4">
                    Completez vos informations de Mobile Money
                  </p>
                </>
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

export default StripePaymentRecharge;

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
