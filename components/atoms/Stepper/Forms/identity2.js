import React, { useContext, useState } from "react";
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import * as yup from "yup";
import { HiArrowSmRight, HiOutlineInformationCircle } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { FiChevronRight, FiUserPlus } from "react-icons/fi";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import Fetcher from "../../../../lib/Fetcher";
import { autocomplete, savePatient } from "../../../../lib/helper";
import { useMutation } from 'react-query';
import LoadingButton from "../../Loader/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setPatientDispatch } from "../../../../redux/reducer";
import Toast from "../../Toast";
import MuiPhoneNumber from "material-ui-phone-number";

function Identity2() {
    const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
    const [phone, setPhone] = useState();
    const [patient, setPatient] = useState({});
    const [patientExist, setPatientExist] = useState(false);
    const [requestComplete, setRequestComplete] = useState(false);
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [state, setState] = useState({ type: 0, message: '' });
    const client = useSelector((state) => state.app.client);
    const [newBenecifiare, setNewBenecifiare] = useState(false);

    const renderError = (message) => (
        <p className="text-xs text-red-600 font-light flex items-center gap-1"><HiOutlineInformationCircle />{message}</p>
    );

    const ValidationSchema = yup.object().shape({
        firstName: yup.string().required("Fistname is a required field"),
        lastName: yup.string().required("Lastname is a required field"),
        email: yup.string().email(),
        homeAddress: yup.string().required("Home Address is a required field"),
        city: yup.string().required("City is a required field"),
        phoneNumber: yup.string(),
    });

    const savePatientMutation = useMutation(savePatient, {
        onSuccess: (res) => {

            if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Successfully registered" })
                dispatch(setPatientDispatch({ ...res }))

                setActiveStepIndex(activeStepIndex + 1);

            };
        }
    });

    const onSubmit = (values) => {
        console.log("ok")
        if (Object.keys(values).length == 0) return console.log("Pas de données");

        values.phoneNumber = phone;
        const data = { ...formData, ...values };

        if (patientExist) {
            // let {phoneNumber, firstName, lastName, email, ...data} = data
            dispatch(setPatientDispatch({ ...client.patient, ...data }))
            setActiveStepIndex(activeStepIndex + 1);

        } else {
            savePatientMutation.mutate({ ...data, accessToken: session.accessToken })
        }
    }

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            homeAddress: "",
            city: "",
            phoneNumber: "",
            country: "",
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

    const handlePhone = async (value) => {
        setPhone(value);
        setRequestComplete(true);

        const res = await autocomplete(value, session.accessToken)

        setRequestComplete(false);

        if (!res.code) {
            setPatient(res)
            setPatientExist(true)

            console.log(res);

            //Set Value
            formik.setFieldValue("phoneNumber", res.phoneNumber)
            formik.setFieldValue("firstName", res.firstName)
            formik.setFieldValue("lastName", res.lastName)
            formik.setFieldValue("email", res.email)

            dispatch(setPatientDispatch({ ...res }))
        } else {
            setPatientExist(false)
        }

    }

    return (
        <>
            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}

            <FormikProvider value={formik}>

                <form className="flex flex-col justify-start md:w-2/3 gap-4" onSubmit={formik.handleSubmit}>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="Choisissez Pays et Entrer le numéro de Téléphone"
                            variant="outlined"
                            countryCodeEditable={false}
                            placeholder="814 877 641"
                            onChange={(value, country) => { formik.setFieldValue("phoneNumber", value); formik.setFieldValue("country", country.countryCode) }}
                            defaultCountry={"cd"}
                            name="phoneNumber"
                        />
                        {formik.errors.phoneNumber ? renderError(formik.errors.phoneNumber) : <></>}
                    </div>

                    {
                        !newBenecifiare ? (
                            <>
                                <div className="flex mt-10 flex-col gap-4">
                                    <h2 className="font-semibold text-xl">Mes bénéficiaires :</h2>
                                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                                        <section className="w-full mx-auto bg-gray-100 flex flex-col items-center justify-center rounded-2xl px-2 py-3 shadow-sm hover:border hover:border-orange transition-all duration-300 cursor-pointer">
                                            <div className="mt-3 w-fit mx-auto">
                                                <img src="/images/homme.png" className="rounded-full w-14 " alt="profile picture" srcset="" />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-gray-700 font-bold text-md tracking-wide">Jonathan Smith</h2>
                                            </div>
                                            <p className="text-orange font-light text-sm mt-1" >
                                                +243 814 978 651 <span></span>
                                            </p>

                                        </section>

                                        <section className="w-full mx-auto bg-gray-100 flex flex-col items-center justify-center rounded-2xl px-2 py-3 shadow-sm hover:border hover:border-orange transition-all duration-300 cursor-pointer">
                                            <div className="mt-3 w-fit mx-auto">
                                                <img src="/images/femme.png" className="rounded-full w-14 " alt="profile picture" srcset="" />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-gray-700 font-bold text-md tracking-wide">Aleks Brice</h2>
                                            </div>
                                            <p className="text-orange font-light text-sm mt-1" >
                                                +237 804 238 693 <span></span>
                                            </p>

                                        </section>

                                        <section className="w-full mx-auto bg-gray-100 flex flex-col items-center justify-center rounded-2xl px-2 py-3 shadow-sm hover:border hover:border-orange transition-all duration-300 cursor-pointer">
                                            <div className="mt-3 w-fit mx-auto">
                                                <img src="/images/homme.png" className="rounded-full w-14 " alt="profile picture" srcset="" />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-gray-700 font-bold text-md tracking-wide">Jonathan Smith</h2>
                                            </div>
                                            <p className="text-orange font-light text-sm mt-1" >
                                                +243 814 978 651 <span></span>
                                            </p>

                                        </section>

                                        <section className="w-full mx-auto bg-gray-100 flex flex-col items-center justify-center rounded-2xl px-2 py-3 shadow-sm hover:border hover:border-orange transition-all duration-300 cursor-pointer">
                                            <div className="mt-3 w-fit mx-auto">
                                                <img src="/images/femme.png" className="rounded-full w-14 " alt="profile picture" srcset="" />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-gray-700 font-bold text-md tracking-wide">Aleks Brice</h2>
                                            </div>
                                            <p className="text-orange font-light text-sm mt-1" >
                                                +237 804 238 693 <span></span>
                                            </p>

                                        </section>

                                        <section className="w-full mx-auto bg-gray-100 flex flex-col items-center justify-center rounded-2xl px-2 py-3 shadow-sm hover:border hover:border-orange transition-all duration-300 cursor-pointer">
                                            <div className="mt-3 w-fit mx-auto">
                                                <img src="/images/homme.png" className="rounded-full w-14 " alt="profile picture" srcset="" />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-gray-700 font-bold text-md tracking-wide">Jonathan Smith</h2>
                                            </div>
                                            <p className="text-orange font-light text-sm mt-1" >
                                                +243 814 978 651 <span></span>
                                            </p>

                                        </section>

                                        <section className="w-full mx-auto bg-gray-100 flex flex-col items-center justify-center rounded-2xl px-2 py-3 shadow-sm hover:border hover:border-orange transition-all duration-300 cursor-pointer">
                                            <div className="mt-3 w-fit mx-auto">
                                                <img src="/images/femme.png" className="rounded-full w-14 " alt="profile picture" srcset="" />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-gray-700 font-bold text-md tracking-wide">Aleks Brice</h2>
                                            </div>
                                            <p className="text-orange font-light text-sm mt-1" >
                                                +237 804 238 693 <span></span>
                                            </p>

                                        </section>

                                    </div>
                                </div>

                                <div className="divider mt-8"><span className="text-gray-400">OU</span></div>

                                <div className="mt-6">
                                    <div className="w-full bg-gray-100 py-4 px-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:shadow-md hover:bg-gray-200 flex justify-between" onClick={() => setNewBenecifiare(true)}>
                                        <div className="flex gap-5 items-center">
                                            <FiUserPlus size={26} />
                                            <h4 className="font-semibold text-lg">Ajouter un nouveau bénéficiaire</h4>
                                        </div>
                                        <FiChevronRight size={26} />
                                    </div>
                                </div>
                            </>
                        ) : <>New Beneficiaire</>
                    }

                    <div className="flex flex-row-reverse ">

                        <button
                            className="bg-primary flex gap-3 items-center w-fit font-medium text-white my-2 py-3 px-5 hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg"
                            type="submit"
                        >
                            {savePatientMutation.isLoading ? <LoadingButton /> : <>{patientExist ? 'Continuer avec ce patient' : 'Next'} <HiArrowSmRight /></>}

                        </button>

                    </div>
                </form>
            </FormikProvider>
        </>
    );
}

export default Identity2;
