import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQRCode } from "next-qrcode";
import { FormContext } from "../../../../pages/voucher/buy";
import * as yup from "yup";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Image from "next/image";
import logoDark from "../../../../public/images/logo_dark_2.png";
import logo from "../../../../public/images/favicon.png";


function Send() {
	const { Canvas } = useQRCode();
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

	const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1"><HiOutlineInformationCircle />{message}</p>
	);


	return (
		<div className="flex flex-col gap-6 justify-center items-center">
			<div className="text-center space-y-2">
				<div className="flex items-end select-none">
					<Image
						src={logoDark}
						className="h-6 md:h-9 object-left object-contain w-min"
					/>
					<h1 className="font-extrabold text-gray-700 text-4xl">Pass</h1>
				</div>
				<span>No. <span className="text-orange">WQ-88930</span></span>
			</div>

			<div className="flex flex-col items-center gap-4">

				<div className="border relative border-gray-300 rounded-lg overflow-hidden">
					<Canvas
						className="w-full"
						text={"https://github.com/frdrcpeter007"}
						options={{
							level: "M",
							margin: 1,
							scale: 9,
							quality: 100,
							color: {
								dark: "#000",
								light: "#FFF",
							},
						}}
					/>
					{/* <div className="absolute w-full h-full z-20 top-1/3 left-1.5/3 mx-auto">
					<Image
						src={logo}
						className="h-6 md:h-9 object-left object-contain w-min"
					/>
				</div> */}
				</div>

				<div className="flex flex-col items-center gap-1">
					<div className="flex -space-x-2">
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
					</div>

					<h4 className="text-sm text-center"><span className="font-semibold">$350</span> Health Pass WiiQare <br /> From <span className="text-orange font-semibold">Bienvenu Z.</span> To <span className="text-orange font-semibold">Peter N.</span></h4>
				</div>
			</div>

			<div className="text-center mt-6 space-y-2">
				<h4 className="font-semibold text-gray-700 text-sm">Share Health Pass with:</h4>
				<div>
					<button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
						<img src="/images/whatsapp.png" alt="" className="w-6"/>
						Share with WhatsApp
					</button>
					<button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
					<img src="/images/facebook-share.png" alt="" className="w-6" />
						Share with Facebook
					</button>
					<button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
					<img src="/images/share.png" alt="" className="w-6" />
						Share with SMS
					</button>
				</div>
			</div>
		</div>
	);
}

export default Send;
