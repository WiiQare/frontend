import React from "react";
import ButtonBuy from "../../Button/Buy";

const Debit = () => {
  return (
    <div class="w-full h-72 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl ">
      <img
        class="relative object-cover w-full h-full rounded-xl"
        src="https://i.imgur.com/kGkSg1v.png"
      />

      <div class="w-full px-8 absolute top-6 flex flex-col gap-5">
        <div class="flex justify-between">
          <div class="space-y-1">
            <p class="font-extralight">Pass Santé</p>
            <h1 className="md:text-4xl font-bold">$490</h1>
          </div>
          <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
        </div>

        <div className="space-y-2">
          <div class="pt-1">
            <p class="font-medium tracking-more-wider text-center">
              **** **** **** 7632
            </p>
          </div>
          <div class="pt-3 pr-6">
            <div class="flex justify-between">
              <div class="">
                <p class="font-extralight text-xs">Valid</p>
                <p class="font-medium tracking-wider text-sm">11/15</p>
              </div>
              <div class="">
                <p class="font-extralight text-xs">Expiry</p>
                <p class="font-medium tracking-wider text-sm">03/25</p>
              </div>

              <div class="">
                <p class="font-extralight text-xs">CVV</p>
                <p class="font-bold tracking-more-wider text-sm">···</p>
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
