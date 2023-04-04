import { useState } from "react";
import { useQRCode } from "next-qrcode";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from "next/image";
import logoDark from "../../../public/images/logo_dark.png";
import logo from "../../../public/images/logo.png";
import Link from "next/link";
import Fetcher from "../../../lib/Fetcher";
import { HiExclamation } from "react-icons/hi";


function Pass() {
	const { Canvas } = useQRCode();
	const [copy, setCopy] = useState(false);

    const {data, isLoading, isError} = Fetcher(`/payment/voucher?paymentId=pi_3MslKtJKtQIM0rWe1s6eJLxh`);

	if(isLoading) return (<>
		<div className="flex flex-col gap-6 justify-between items-center h-full w-full pt-20 overflow-hidden">
			<div role="status">
				<svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
					<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	</>)

	if(isError) return (<>
		<div className="flex flex-col gap-6 items-center h-screen w-full pt-56 overflow-hidden">
			<HiExclamation size={100} className="text-red-600"/>
			<span>Error Voucher !</span>
		</div>
	</>)

	const SliceText = ({text}) => {
		return <>{text.slice(0, 8)}...{text.slice(-7)}</>
	}

	return (
		<div className="flex flex-col gap-6 justify-between items-center h-full w-full pt-20 overflow-hidden">
			<>
				<div className="flex flex-col items-center text-center space-y-2">
					<div className="flex flex-col items-center select-none">
						<Image
							src={logoDark}
							className="h-6 md:h-9 object-left object-contain w-min"
						/>
						<h1 className="font-extrabold text-gray-700 text-lg hidden md:flex">Pass Sante</h1>
					</div>
					<span className="text-xs flex items-center gap-1">Pass Sante ID:
						<CopyToClipboard text={data.transactionHash} onCopy={() => {
							setCopy(true); setTimeout(() => {
								setCopy(false)
							}, 2000);
						}}>
							<div className="flex items-center gap-1">
								[
								<div className="tooltip" data-tip={!copy ? "Copy to clipboard" : "✓ Copy"}>
									<span className="text-orange cursor-pointer"><SliceText text={data.transactionHash}/></span>
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
							text={`https://wiiqare-unicef.herokuapp.com/voucher/pass/${data.transactionHash}`}
							options={{
								level: "M",
								margin: 1,
								scale: 6,
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
							<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/homme.png" alt="Image Description" />
							<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/femme.png" alt="Image Description" />
						</div>

						<h4 className="text-sm text-center"><span className="font-semibold">{data.currency == "usd" ? "$" : data.currency}{data.amount}</span> Health Pass WiiQare <br /> From <span className="text-orange font-semibold"><SliceText text={data.senderId}/></span> To <span className="text-orange font-semibold"><SliceText text={data.voucher.patientId} /></span></h4>
					</div>
				</div>
			</>

			<span className="text-sm text-gray-400 absolute bottom-6">Contactez-Nous: <Link href={"tel:+243979544127"} legacyBehavior>+243 979 544 127</Link></span>

		</div>
	);
}

export default Pass;
