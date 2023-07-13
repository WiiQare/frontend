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
  return (<>Hello</>)
}

export default Identity2;
