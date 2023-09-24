import { Fragment, useContext, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import { BiTransferAlt } from 'react-icons/bi';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { DrawContext } from '../../../../pages/_app';
import { useMutation } from 'react-query';
import LoadingButton from '../../Loader/LoadingButton';
import { addPlan } from '../../../../lib/helper';
import { useSession } from 'next-auth/react';
import Toast from '../../Toast';
import Image from 'next/image';

const SavingCard = ({ title, img, month = 12 }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculate, setIsCalculate] = useState(false);
  const [plan, setPlan] = useState({ type: '', amount: 0, currency: 'USD' });
  const [pricing, setPricing] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [state, setState] = useState({ type: 0, message: '' });
  const router = useRouter();
  const { setSaving, saving } = useContext(DrawContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
    setSaving({ ...saving, title, month });
  };

  const calculatePrice = (amount) => {
    let prices = [];

    prices.push({ amount: amount / (month * 31), type: 'DAY', currency });
    prices.push({ amount: amount / (month * 4), type: 'WEEK', currency });
    prices.push({ amount: amount / month, type: 'MONTH', currency });

    setPlan(prices[0]);
    setPricing(prices);

    console.log(saving);
  };

  const onSubmit = (values) => {
    if (Object.keys(values).length == 0) return console.log('Pas de données');

    console.log(values);
    if (parseInt(values.amount) == NaN) {
      setState({ type: 2, message: 'Le prix doit être numérique' });
      setTimeout(() => {
        setState({ type: 0, message: '' });
      }, 3000);

      return null;
    }

    setSaving({ ...saving, target: { amount: values.amount, currency } });
    calculatePrice(parseInt(values.amount));

    console.log(pricing);
    setIsCalculate(true);
  };

  const ValidationSchema = yup.object().shape({
    amount: yup
      .number('Le montant doit être numérique')
      .required('Le montant est requis'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: ValidationSchema,
    onSubmit,
  });

  const renderError = (message) => (
    <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">
      {message}
    </p>
  );

  const newPlan = useMutation(addPlan, {
    onSuccess: (res) => {
      if (res.code) {
        setState({ type: 2, message: res.message ?? res.description });
        setTimeout(() => {
          setState({ type: 0, message: '' });
        }, 3000);
      } else {
        setSaving({ ...saving, idSaving: res.id });
        router.push('/saving/summary');
      }
    },
  });

  const summaryPage = () => {
    console.log(saving);
    newPlan.mutate({
      user: session.user.data.userId,
      type: title == 'Pour moi' ? 'MOI' : title.toUpperCase(),
      amount: saving.target.amount,
      currency: saving.target.currency,
      frequency: plan.type,
      accessToken: session.accessToken,
    });
  };

  const closeToast = () => {
    setState({ type: 0, message: '' });
  };

  return (
    <>
      {state.type > 0 ? (
        state.type == 2 ? (
          <Toast type={'danger'} message={state.message} close={closeToast} />
        ) : state.type == 1 ? (
          <Toast type={'success'} message={state.message} close={closeToast} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <div
        onClick={() => openModal()}
        className="order-2 md:order-1 bg-white p-5 md:p-10 flex flex-col justify-center items-center rounded-lg shadow-sm hover:shadow-md duration-200 transition-all cursor-pointer gap-4"
      >
        <div className="p-3 rounded-md border border-blue-200 w-fit">
          <Image src={img} alt="Myself" className="w-20" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="uppercase text-xs md:text-sm font-bold">{title}</h3>
          <HiArrowLongRight size={25} />
        </div>
      </div>

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
                      <h3 className="mx-auto uppercase font-bold">
                        <span className="text-orange font-medium">
                          Épargne -{' '}
                        </span>
                        {title}
                      </h3>

                      <div className="space-y-10">
                        <div className="flex gap-4 items-center px-5 justify-center">
                          <Image
                            className="inline-block w-16"
                            src={img}
                            alt="Image Description"
                          />
                          <BiTransferAlt size={30} className="text-gray-400" />
                          <Image
                            className="inline-block w-14"
                            src="https://i.goopics.net/nkg0du.png"
                            alt="Image Description"
                          />
                        </div>

                        <form
                          className="flex w-full gap-8 flex-col"
                          id="object"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                              <h1 className="font-normal text-md text-gray-400">
                                Choisir la devise :{' '}
                              </h1>

                              <label
                                htmlFor="Toggle4"
                                className="inline-flex items-center rounded-full overflow-hidden cursor-pointer bg-white border-2 border-primary text-primary"
                              >
                                <span
                                  onClick={(e) => setCurrency('CDF')}
                                  className={`px-4 py-2  ${currency == 'CDF'
                                    ? 'bg-primary text-white'
                                    : 'bg-transparent text-primary'
                                    } font-semibold select-none text-sm`}
                                >
                                  CDF
                                </span>
                                <span
                                  onClick={(e) => setCurrency('EUR')}
                                  className={`px-4 py-2  ${currency == 'EUR'
                                    ? 'bg-primary text-white'
                                    : 'bg-transparent text-primary'
                                    } font-semibold select-none text-sm`}
                                >
                                  EUR
                                </span>
                                <span
                                  onClick={(e) => setCurrency('USD')}
                                  className={`px-4 py-2  font-semibold ${currency == 'USD'
                                    ? 'bg-primary text-white'
                                    : 'bg-transparent text-primary'
                                    } select-none text-sm`}
                                >
                                  USD
                                </span>
                              </label>
                            </div>
                            <div>
                              <label
                                htmlFor="hs-inline-leading-pricing-select-label"
                                className="block text-sm font-semibold mb-2"
                              >
                                Votre objectif (Pour {month} mois)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  id="hs-inline-leading-pricing-select-label"
                                  name="amount"
                                  className={`py-3 px-4 ${currency == 'USD' || currency == 'EUR'
                                    ? 'pl-9'
                                    : 'pl-16'
                                    } pr-5 block w-full border-gray-200 shadow-sm rounded-md text-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 outline-none`}
                                  placeholder="0.00"
                                  {...formik.getFieldProps('amount')}
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                                  <span className="text-gray-500 font-semibold text-lg">
                                    {currency == 'USD'
                                      ? '$'
                                      : currency == 'EUR'
                                        ? '€'
                                        : 'CDF'}
                                  </span>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 pr-px">
                                  <label
                                    htmlFor="hs-inline-leading-select-currency"
                                    className="sr-only"
                                  >
                                    Currency
                                  </label>
                                </div>
                              </div>

                              {formik.errors.amount && formik.touched.amount ? (
                                renderError(formik.errors.amount)
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-row-reverse gap-4">
                            <button
                              form="object"
                              type="submit"
                              className="bg-orange text-sm py-3 px-5 rounded-lg effect-up uppercase font-semibold text-white"
                            >
                              Calculer
                            </button>
                          </div>

                          {isCalculate && pricing.length > 0 ? (
                            <div class={`container mx-auto`}>
                              <p class="text-sm text-center text-gray-500">
                                Choisir un plan
                              </p>

                              <h1 class="mt-1 text-md font-semibold text-center text-gray-800 capitalize lg:text-xl">
                                Prix calculer
                              </h1>

                              <div class="mt-8 space-y-8">
                                <div
                                  onClick={() => {
                                    setPlan(pricing[0]);
                                    setSaving({ ...saving, plan: pricing[0] });
                                  }}
                                  class={`flex items-center justify-between max-w-2xl px-4 py-4 mx-auto border cursor-pointer rounded-xl ${plan.type == 'DAY' ? 'border-blue-500' : ''
                                    }`}
                                >
                                  <div class="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class={`w-5 h-5 sm:h-9 sm:w-9 ${plan.type == 'DAY'
                                        ? 'text-blue-600'
                                        : 'text-gray-400'
                                        }`}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>

                                    <div class="flex flex-col mx-5 space-y-1">
                                      <h2 class="text-lg font-medium text-gray-700">
                                        Journalier
                                      </h2>

                                      <div class="px-2 text-xs text-green-400 bg-gray-100 rounded-full sm:py-1 w-fit">
                                        Save 5%
                                      </div>
                                    </div>
                                  </div>

                                  <h2
                                    class={`text-2xl font-semibold sm:text-3xl ${plan.type == 'DAY'
                                      ? 'text-blue-600'
                                      : 'text-gray-500'
                                      }`}
                                  >
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: pricing[0].currency,
                                    }).format(pricing[0].amount)}
                                    &nbsp;
                                    <span class="text-base font-medium">
                                      /jour
                                    </span>
                                  </h2>
                                </div>

                                <div
                                  onClick={() => {
                                    setPlan(pricing[1]);
                                    setSaving({ ...saving, plan: pricing[1] });
                                  }}
                                  class={`flex items-center justify-between max-w-2xl px-4 py-4 mx-auto border cursor-pointer rounded-xl ${plan.type == 'WEEK' ? 'border-blue-500' : ''
                                    }`}
                                >
                                  <div class="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class={`w-5 h-5 sm:h-9 sm:w-9 ${plan.type == 'WEEK'
                                        ? 'text-blue-600'
                                        : 'text-gray-400'
                                        }`}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>

                                    <div class="flex flex-col mx-5 space-y-1">
                                      <h2 class="text-lg font-medium text-gray-700">
                                        Hebdomadaire
                                      </h2>

                                      <div class="px-2 text-xs text-green-400 bg-gray-100 rounded-full sm:py-1 w-fit">
                                        Save 20%
                                      </div>
                                    </div>
                                  </div>

                                  <h2
                                    class={`text-2xl font-semibold sm:text-3xl ${plan.type == 'WEEK'
                                      ? 'text-blue-600'
                                      : 'text-gray-500'
                                      }`}
                                  >
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: pricing[1].currency,
                                    }).format(pricing[1].amount)}
                                    &nbsp;
                                    <span class="text-base font-medium">
                                      /Sem.
                                    </span>
                                  </h2>
                                </div>

                                <div
                                  onClick={() => {
                                    setPlan(pricing[2]);
                                    setSaving({ ...saving, plan: pricing[2] });
                                  }}
                                  class={`flex items-center justify-between max-w-2xl px-4 py-4 mx-auto border cursor-pointer rounded-xl ${plan.type == 'MONTH'
                                    ? 'border-blue-500'
                                    : ''
                                    }`}
                                >
                                  <div class="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class={`w-5 h-5 sm:h-9 sm:w-9 ${plan.type == 'MONTH'
                                        ? 'text-blue-600'
                                        : 'text-gray-400'
                                        }`}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>

                                    <div class="flex flex-col mx-5 space-y-1">
                                      <h2 class="text-lg font-medium text-gray-700">
                                        Mensuel
                                      </h2>

                                      <div class="px-2 text-xs text-green-400 bg-gray-100 rounded-full sm:py-1 w-fit">
                                        Save 33%
                                      </div>
                                    </div>
                                  </div>

                                  <h2
                                    class={`text-2xl font-semibold sm:text-3xl ${plan.type == 'MONTH'
                                      ? 'text-blue-600'
                                      : 'text-gray-500'
                                      }`}
                                  >
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: pricing[2].currency,
                                    }).format(pricing[2].amount)}
                                    &nbsp;
                                    <span class="text-base font-medium">
                                      /Mois
                                    </span>
                                  </h2>
                                </div>

                                <div class="flex justify-center">
                                  <button
                                    type="button"
                                    className="px-8 py-3 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    onClick={() => summaryPage()}
                                  >
                                    Choisir un plan
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SavingCard;
