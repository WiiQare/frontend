import React from "react";
import ButtonBuy from "../../Button/Buy";

const Debit = () => {
  return (
    <div className="w-full h-72 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl ">
      <img
        className="relative object-cover w-full h-full rounded-xl"
        src="https://i.imgur.com/kGkSg1v.png"
      />

      <div className="w-full px-8 absolute top-6 flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="font-extralight">Pass Santé</p>
            <h1 className="md:text-4xl font-bold">$490</h1>
          </div>
          <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
        </div>

        <div className="space-y-2">
          <div className="pt-1">
            <p className="font-medium tracking-more-wider text-center">
              **** **** **** 7632
            </p>
          </div>
          <div className="pt-3 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-extralight text-xs">Valid</p>
                <p className="font-medium tracking-wider text-sm">11/15</p>
              </div>
              <div className="">
                <p className="font-extralight text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">03/25</p>
              </div>

              <div className="">
                <p className="font-extralight text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>

        <div className="self-center mt-3 relative">
          <ButtonBuy />
        </div>
      </div>
    </div>
  );
};

export default Debit;
