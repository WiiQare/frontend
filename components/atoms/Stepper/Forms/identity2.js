import React, { createContext, useContext, useEffect, useState } from "react";
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import * as yup from "yup";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import { FiChevronRight, FiUserPlus } from "react-icons/fi";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Fetcher from "../../../../lib/Fetcher";
import { autocomplete, savePatient } from "../../../../lib/helper";
import { useMutation } from "react-query";
import LoadingButton from "../../Loader/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setPatientDispatch } from "../../../../redux/reducer";
import Toast from "../../Toast";
import MuiPhoneNumber from "material-ui-phone-number";
import { Stack, TextField } from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import avatar from "../../../../public/images/femme.png";
import Image from "next/image";
import { CiCircleCheck, CiCircleInfo } from "react-icons/ci";
import { BiCaretRight } from "react-icons/bi";
import CountrySelect from "../../Input/Country";
export const CountryContext = createContext();

function Identity2() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);
  const [phone, setPhone] = useState();
  const [patient, setPatient] = useState({});
  const [patientExist, setPatientExist] = useState(false);
  const [requestComplete, setRequestComplete] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [state, setState] = useState({ type: 0, message: "" });
  const client = useSelector((state) => state.app.client);
  const [newBenecifiare, setNewBenecifiare] = useState(false);
  const [activeIndexSlide, setActiveIndexSlide] = useState(null);
  const [country, setCountry] = useState("cd");
  const [countryLabel, setCountryLabel] = useState("RD Congo");
  const [allBeneficiare, setAllBeneficiare] = useState([]);
  const [tempBeneficiare, setTempBeneficiare] = useState([]);
  const [dial, setDial] = useState("243");

  const renderError = (message) => (
    <p className="text-xs text-red-600 font-light flex items-center gap-1">
      <HiOutlineInformationCircle />
      {message}
    </p>
  );

  const ValidationSchema = yup.object().shape({
    firstName: yup.string().required("Le nom est un champ obligatoire"),
    lastName: yup.string().required("Le prénom est un champ obligatoire"),
    email: yup.string().email(),
    homeAddress: yup
      .string()
      .required("L'adresse du domicile est un champ obligatoire"),
    city: yup.string().required("La ville est un champ obligatoire"),
    phoneNumber: yup.string().required("Téléphone est requis"),
    country: yup.string(),
  });

  const savePatientMutation = useMutation(savePatient, {
    onSuccess: (res) => {
      if (res.code) {
        setState({ type: 2, message: res.message ?? res.description });
        setTimeout(() => {
          setState({ type: 0, message: "" });
        }, 3000);
      } else {
        setState({ type: 1, message: "Enregistré avec succès" });
        dispatch(setPatientDispatch({ ...res, countryLabel }));

        setActiveStepIndex(activeStepIndex + 1);
      }
    },
  });

  const onSubmit = (values) => {
    if (Object.keys(values).length == 0) return console.log("Pas de données");

    !values.email ? delete values.email : null;

    const data = { ...formData, ...values };

    if (patientExist) {
      dispatch(
        setPatientDispatch({ ...client.patient, ...data, countryLabel })
      );
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      savePatientMutation.mutate({ ...data, accessToken: session.accessToken });
    }
  };

  const closeToast = () => {
    setState({ type: 0, message: "" });
  };

  const formik = useFormik({
    initialValues: {
      firstName: localStorage.getItem("firstName") ?? "",
      lastName: localStorage.getItem("lastName") ?? "",
      email: localStorage.getItem("email") ?? "",
      homeAddress: localStorage.getItem("homeAddress") ?? "",
      city: localStorage.getItem("city") ?? "",
      phoneNumber: localStorage.getItem("phoneNumber") ?? "",
      country: localStorage.getItem("country") ?? "",
    },
    validationSchema: ValidationSchema,
    onSubmit,
  });

  const handlePhone = async (value) => {
    setPhone(value);
    setRequestComplete(true);

    const res = await autocomplete(value, session.accessToken);

    setRequestComplete(false);

    if (!res.code) {
      setPatient(res);
      setPatientExist(true);

      console.log(res);

      //Set Value
      formik.setFieldValue("phoneNumber", res.phoneNumber);
      formik.setFieldValue("firstName", res.firstName);
      formik.setFieldValue("lastName", res.lastName);
      formik.setFieldValue("email", res.email);

      dispatch(setPatientDispatch({ ...res }));
    } else {
      setPatientExist(false);
    }
  };

  const handleSelect = (item, index) => {
    console.log(item);
    setActiveIndexSlide(index);
    dispatch(
      setPatientDispatch({
        ...client.patient,
        id: item.id,
        country: item.country,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        city: item.city,
        homeAddress: item.homeAddress,
      })
    );
    setActiveStepIndex(activeStepIndex + 1);
  };

  const { data, isLoading, isError } = Fetcher(
    `/payer/patient?payerId=${session.user.data.userId}`,
    session.user.data.access_token
  );

  useEffect(() => {
    setAllBeneficiare(data);
    setTempBeneficiare(data);
  }, [data]);

  const handleKey = (e) => {
    let value =
      e.target.value.length > 0 && e.target.value[0] == "+"
        ? e.target.value.split("+")[1]
        : e.target.value;
    let filter = tempBeneficiare.filter(function (beneficiare) {
      return (
        new RegExp(value, "i").test(
          beneficiare.firstName + " " + beneficiare.lastName
        ) ||
        new RegExp(value, "i").test(beneficiare.phoneNumber) ||
        new RegExp(value, "i").test(beneficiare.email)
      );
    });

    setTempBeneficiare(value.trim() != "" ? filter : allBeneficiare);
  };

  return (
    <>
      {state.type > 0 ? (
        state.type == 2 ? (
          <Toast type={"danger"} message={state.message} close={closeToast} />
        ) : state.type == 1 ? (
          <Toast type={"success"} message={state.message} close={closeToast} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      <div className="flex flex-col justify-start md:w-2/3 w-full gap-4">
        {!newBenecifiare ? (
          <>
            {allBeneficiare && allBeneficiare.length > 0 ? (
              <>
                <div className="space-y-1 w-full">
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Rechercher un bénéficiaire par Nom ou par Numéro Téléphone"
                    variant="outlined"
                    onChange={handleKey}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <span className="flex items-center gap-1 text-rose-500 text-left text-xs px-1">
                      <HiOutlineInformationCircle />
                      <span>{formik.errors.email}</span>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex mt-10 flex-col gap-4 w-80 md:w-full">
                  <h2 className="font-semibold text-xl">Mes bénéficiaires :</h2>

                  <div className="bg-white py-4 px-2 relative rounded-lg space-y-8 h-full w-80 md:w-full">
                    {isLoading || isError ? (
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div
                          className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-gray-500 rounded-full"
                          role="status"
                          ariaLabel="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {tempBeneficiare.length > 0 ? (
                          <Splide
                            hasTrack={false}
                            aria-label="Attribution"
                            options={{
                              type: "slide",
                              perPage: 2,
                              mediaQuery: "min",
                              gap: 10,
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
                                //setActiveIndexSlide(slide.index)
                              }
                            }}
                            className="container mx-auto px-8"
                          >
                            <SplideTrack hasTrack={false}>
                              {tempBeneficiare.map((item, index) => (
                                <SplideSlide
                                  key={index}
                                  className="w-min flex flex-col gap-2 items-center justify-center p-3"
                                  onClick={() => handleSelect(item, index)}
                                >
                                  <div className="w-20 h-2O relative">
                                    <Image
                                      src={
                                        index % 2 ? avatar : "/images/homme.png"
                                      }
                                      className="object-cover rounded-xl"
                                      width={80}
                                      height={80}
                                      alt="Beneficiare image"
                                    />
                                    <span
                                      className={`${
                                        activeIndexSlide === index
                                          ? ""
                                          : "hidden"
                                      } p-1.5 rounded-lg bg-blue-600 text-white absolute right-0 bottom-0`}
                                    >
                                      <CiCircleCheck size={18} />
                                    </span>
                                  </div>

                                  <span className="font-semibold text-sm">
                                    {item.firstName} {item.lastName}
                                  </span>
                                  <span className="text-xs font-light">
                                    {item.phoneNumber}
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
                        ) : (
                          <div className="w-full flex flex-col items-center gap-3">
                            <Image
                              src="/images/box.png"
                              alt="Box image"
                              loading="lazy"
                              className="h-44 opacity-50"
                            />
                            <span className="text-gray-400 text-xs font-normal">
                              Aucun bénéficiaire en rapport avec votre
                              recherche...
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="divider mt-8">
                  <span className="text-gray-400">OU</span>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="mt-6">
              <div
                className="w-full bg-gray-100 py-4 px-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:shadow-md hover:bg-gray-200 flex justify-between"
                onClick={() => setNewBenecifiare(true)}
              >
                <div className="flex gap-5 items-center">
                  <FiUserPlus size={26} />
                  <h4 className="font-semibold md:text-lg text-sm">
                    Ajouter un bénéficiaire
                  </h4>
                </div>
                <FiChevronRight size={26} />
              </div>
            </div>
          </>
        ) : (
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} autoComplete="false">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="md:w-1/3 w-full inline-flex">
                    <CountryContext.Provider
                      value={{ country, setCountry, setCountryLabel }}
                    >
                      <CountrySelect />
                    </CountryContext.Provider>
                  </div>
                  <div className="flex items-center gap-1 md:w-2/3">
                    <div className="flex flex-col w-full gap-1">
                      <MuiPhoneNumber
                        fullWidth
                        label="Numéro de Téléphone"
                        variant="outlined"
                        countryCodeEditable={false}
                        select={false}
                        value={localStorage.getItem("phoneNumber") ?? ""}
                        defaultValue={localStorage.getItem("phoneNumber") ?? ""}
                        onChange={(value, country) => {
                          formik.setFieldValue("phoneNumber", value);
                          formik.setFieldValue("country", country.countryCode);
                          setDial(country.dialCode);
                          localStorage.setItem("phoneNumber", value);
                          localStorage.setItem("country", country.countryCode);
                        }}
                        defaultCountry={country}
                        name="phoneNumber"
                      />
                      {formik.values.phoneNumber.trim(" ") == "" ||
                      formik.values.phoneNumber
                        .replace("+" + dial, " ")
                        .trim(" ") == "" ? (
                        renderError("Entrez le numéro de téléphone")
                      ) : (
                        <></>
                      )}
                    </div>
                    <span className="w-fit h-fit p-2 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                      <span
                        className="tooltip tooltip-bottom text-xs"
                        data-tip={`${
                          formik.values.phoneNumber.trim(" ") != ""
                            ? formik.values.phoneNumber
                            : "Ce numéro de téléphone"
                        } devra être le numéro disponible, pour être utilisé à l'hôpital `}
                      >
                        <CiCircleInfo size={23} className="text-red-400" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <Stack spacing={1.5} className="w-full mt-3">
                <div className="flex gap-2 md:gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Nom de famille"
                      variant="outlined"
                      name="firstName"
                      defaultValue={localStorage.getItem("firstName") ?? ""}
                      onKeyUp={(e) => {
                        localStorage.setItem("firstName", e.target.value);
                      }}
                      autoComplete="off"
                      {...formik.getFieldProps("firstName")}
                    />

                    {formik.errors.firstName && formik.touched.firstName ? (
                      renderError(formik.errors.firstName)
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Prénom"
                      variant="outlined"
                      name="lastName"
                      defaultValue={localStorage.getItem("lastName") ?? ""}
                      onKeyUp={(e) => {
                        localStorage.setItem("lastName", e.target.value);
                      }}
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                      renderError(formik.errors.lastName)
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Adresse e-mail (optional)"
                    variant="outlined"
                    name="email"
                    defaultValue={localStorage.getItem("email") ?? ""}
                    onKeyUp={(e) => {
                      localStorage.setItem("email", e.target.value);
                    }}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <span className="flex items-center gap-1 text-rose-500 text-left text-xs px-1">
                      <HiOutlineInformationCircle />
                      <span>{formik.errors.email}</span>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Adresse du domicile"
                      variant="outlined"
                      name="homeAddress"
                      defaultValue={localStorage.getItem("homeAddress") ?? ""}
                      onKeyUp={(e) => {
                        localStorage.setItem("homeAddress", e.target.value);
                      }}
                      {...formik.getFieldProps("homeAddress")}
                    />

                    {formik.errors.homeAddress && formik.touched.homeAddress ? (
                      renderError(formik.errors.homeAddress)
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Ville"
                      variant="outlined"
                      name="city"
                      defaultValue={localStorage.getItem("city") ?? ""}
                      onKeyUp={(e) => {
                        localStorage.setItem("city", e.target.value);
                      }}
                      {...formik.getFieldProps("city")}
                    />
                    {formik.errors.city && formik.touched.city ? (
                      renderError(formik.errors.city)
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Stack>

              <div className="flex flex-row-reverse justify-between">
                <button
                  className="bg-primary flex gap-3 items-center w-fit font-medium text-white my-2 py-3 px-5 hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg"
                  type="submit"
                >
                  {savePatientMutation.isLoading ? (
                    <LoadingButton />
                  ) : (
                    <>
                      {patientExist ? "Continuer avec ce patient" : "Suivant"}{" "}
                      <HiArrowSmRight />
                    </>
                  )}
                </button>

                <button
                  className="bg-primary flex gap-3 items-center w-fit font-medium text-white my-2 py-3 px-5 hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg"
                  type="button"
                  onClick={() => setNewBenecifiare(false)}
                >
                  <HiArrowSmLeft /> Précédent
                </button>
              </div>
            </form>
          </FormikProvider>
        )}
      </div>
    </>
  );
}

export default Identity2;
