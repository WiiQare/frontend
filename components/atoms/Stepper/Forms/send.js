import React, { useContext, useState } from "react";
import { useQRCode } from "next-qrcode";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormContext } from "../../../../pages/voucher/buy";
import Image from "next/image";
import logoDark from "../../../../public/images/logo_dark_2.png";
import { HiOutlineClipboardDocument } from "react-icons/hi2";


function Send() {
	const { Canvas } = useQRCode();
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
	const [copy, setCopy] = useState(false);


	return (
		<div className="flex flex-col gap-6 justify-center items-center">
			<div className="flex flex-col items-center text-center space-y-2">
				<div className="flex flex-col items-center select-none">
					<Image
						src={logoDark}
						className="h-6 md:h-9 object-left object-contain w-min"
					/>
					<h1 className="font-extrabold text-gray-700 text-lg hidden md:flex">Pass Sante</h1>
				</div>
				<span className="text-xs flex items-center gap-1">Pass Sante ID:
					<CopyToClipboard text={"0xf59b12eccfc5faedbc4657bd593d6d6a0c679623"} onCopy={() => {
						setCopy(true); setTimeout(() => {
							setCopy(false)
						}, 2000);
					}}>
						<div className="flex items-center gap-1">
							[
							<div className="tooltip" data-tip={!copy ? "Copy to clipboard" : "✓ Copy"}>
								<span className="text-orange cursor-pointer">0xf59b12...c679623</span>
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
						text={"https://github.com/frdrcpeter007"}
						options={{
							level: "M",
							margin: 1,
							scale: 7,
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
				<h4 className="font-semibold text-gray-700 text-sm">Envoyer le pass santé au bénéficiaire:</h4>
				<div className="flex justify-between">
					<button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
						<img src="/images/whatsapp.png" alt="" className="w-6" />
						WhatsApp
					</button>
					<button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
						<img src="/images/facebook-share.png" alt="" className="w-6" />
						Facebook
					</button>
					<button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 mr-2 mb-2">
						<img src="/images/share.png" alt="" className="w-6" />
						Message
					</button>
				</div>
			</div>
		</div>
	);
}

export default Send;
