import React, { useState } from "react";
import { useQRCode } from "next-qrcode";
import styled from "styled-components";
import Image from "next/image";
import ButtonBuy from "../../Button/Buy";

import logo from "../../../../public/images/logo.png";
import { CiEdit } from "react-icons/ci";

const CardWrap = styled.div`
  && * {
    font-family: sans-serif;
  }
  && {
    width: 40rem;
    color: #fff;
    font-family: sans-serif;
  }

  && .v-card {
    background: linear-gradient(
      to bottom,
      #007bff 0%,
      #007bff 26%,
      #fff 26%,
      #fff 100%
    );
    height: 15em;
    float: left;
    position: relative;
    padding: 1em;
  }

  && .cardLeft {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 27rem;
  }

  && .cardRight {
    width: 10em;
    border-left: 0.18em dashed rgba(0, 0, 0, 0.2);
    
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  && .cardRight:before,
  && .cardRight:after {
    content: "";
    position: absolute;
    display: block;
    width: 0.9em;
    height: 0.9em;
    background: #f0f4fd;
    border-radius: 50%;
    left: -0.5em;
  }
  && .cardRight:before {
    top: -0.4em;
  }
  && .cardRight:after {
    bottom: -0.4em;
  }

  && h1 {
    font-size: 1.1em;
    margin-top: 0;
  }
  && h1 span {
    font-weight: normal;
  }

  && .title,
  && .code,
  && .date,
  && .time {
    text-transform: uppercase;
    font-weight: normal;
  }
  && .title h2,
  && .code h2,
  && .date h2,
  && .time h2 {
    font-size: 0.9em;
    color: #525252;
    margin: 0;
    margin-bottom: 0.2em;
    line-height: 0;
    font-weight: bold;
  }
  && .title span,
  && .code span,
  && .date span,
  && .time span {
    font-size: 0.7em;
    color: #a2aeae;
  }

  && .title {
    margin: 2em 0 0 0;
  }

  && .code,
  && .date {
    margin: 1em 0 0 0;
  }

  && .time {
    margin: 1em 0 0 1em;
  }

  && .date,
  && .time {
    float: left;
  }

  && .buy {
    float: right;
  }

  && .price {
    text-align: center;
    text-transform: uppercase;
  }
  && .price h3 {
    color: #f8892b;
    margin: 1.5em 0 1.2em 0;
    font-size: 2.7em;
    line-height: 0;
    font-weight: bold;
  }
  && .price span {
    display: block;
    color: #a2aeae;
  }
  && .scan {
    top: 1em;
    position: relative;
    text-align: center;
    font-size: 0.9em;
    color: #a2aeae;
    left: 3px;
  }
  && .qr {
    top: 0.5em;
    position: relative;
  }
  && .logo {
    top: -0.8em;
    position: relative;
  }
`;

const WithQR = () => {
	const { Canvas } = useQRCode();
	let now = new Date();

	const [edit, setEdit] = useState(false);

	return (
		<CardWrap className="flex !w-full md:!w-[40rem] h-full">
			<div className="v-card cardLeft shadow-sm !w-4/6">
				<h1 className="font-light uppercase flex items-center !text-sm md:!text-lg">
					Pass santé Voucher
				</h1>

				<div className="price relative flex items-center justify-center w-full h-fit -mb-4">
					<h3 className="!text-2xl md:!text-3xl flex justify-center items-center">$<input type="text" defaultValue={"200.00"} className="w-28 p-0 text-3xl border-none focus:ring-0 pointer-events-none " id="voucherAmount" /></h3>
					<label htmlFor="voucherAmount" className="cursor-pointer">
						<CiEdit size={20} className=" text-gray-800 hover:text-orange transition-all duration-200" />
					</label>
				</div>

				<div className="code">
					<h2 className="">284 *** *** *** *** </h2>
					<span>Code</span>
				</div>
				<div className="date">
					<h2>{new Intl.DateTimeFormat('fr-FR').format(now)}</h2>
					<span>date</span>
				</div>
				<div className="time">
					<h2>{new Intl.DateTimeFormat('fr-FR', { hour: "2-digit", minute: "2-digit" }).format(now)}</h2>
					<span>time</span>
				</div>
				<div className="buy hidden md:flex">
					<ButtonBuy href={`/voucher/buy`} title={"Buy now"}/>
				</div>
			</div>
			<div className="v-card cardRight shadow-sm !relative !w-2/6">
				<div className="logo !relative !top-1 md:!-top-2">
					<Image
						height={25}
						src={logo}
						className="h-8 md:h-14 w-min object-left object-contain"
					/>
				</div>
				<div className="qr md:!w-full !flex !flex-col  text-center items-center justify-between !px-2 md:!px-0 !w-20 !mt-4 md:mt-0">
					<Canvas
						className="w-full"
						text={"https://github.com/frdrcpeter007"}
						options={{
							level: "M",
							margin: 1,
							scale: 3,
							quality: 100,
							color: {
								dark: "#000",
								light: "#FFF",
							},
						}}
					/>
				</div>
				<div className="scan !w-full !flex !justify-around">
					<span className=" hidden md:flex !justify-center">Scan QR Code</span>

            <div className="md:hidden">
					<ButtonBuy href={`/voucher/buy`} title={"Buy now"} className="text-white mr-3 md:mr-0" withIcon={false}/>
				</div>
				</div>
			</div>
		</CardWrap>
	);
};

export default WithQR;
