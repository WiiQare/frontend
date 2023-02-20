import React from "react";
import { useQRCode } from "next-qrcode";
import styled from "styled-components";
import Image from "next/image";
import ButtonBuy from "../../Button/Buy";

import logo from "../../../../public/images/logo.png";

const CardWrap = styled.div`
  && * {
    font-family: sans-serif;
  }
  && {
    width: 30em;
    color: #fff;
    font-family: sans-serif;
  }

  && .v-card {
    background: linear-gradient(
      to bottom,
      #007bff 0%,
      #007bff 26%,
      #ecedef 26%,
      #ecedef 100%
    );
    height: 15em;
    float: left;
    position: relative;
    padding: 1em;
    ${"" /* margin-top: 100px; */}
  }

  && .cardLeft {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 19em;
  }

  && .cardRight {
    width: 9.5em;
    border-left: 0.18em dashed #f0f4fd;
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
  return (
    <CardWrap>
      <div className="v-card cardLeft">
        <h1 className="">
          Pass santé <span> Voucher</span>
        </h1>

        <div className="price">
          <h3>200.00 $</h3>
        </div>

        <div className="code">
          <h2>284 xxx xxx xxx xxx </h2>
          <span>Code</span>
        </div>
        <div className="date">
          <h2>25/23</h2>
          <span>date</span>
        </div>
        <div className="time">
          <h2>12:00</h2>
          <span>time</span>
        </div>
        <div className="buy">
          <ButtonBuy />
        </div>
      </div>
      <div className="v-card cardRight">
        <div className="logo">
          <Image
            height={25}
            src={logo}
            className="h-8 md:h-14 w-min object-left object-contain"
          />
        </div>
        <div className="qr">
          <Canvas
            text={"https://github.com/frdrcpeter007"}
            options={{
              level: "M",
              margin: 2,
              scale: 3.6,
              color: {
                dark: "#000",
                light: "#FFF",
              },
            }}
          />
        </div>
        <div className="scan">
          <span>scan qr code</span>
        </div>
      </div>
    </CardWrap>
  );
};

export default WithQR;
