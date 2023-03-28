import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../pages/voucher/buy";

function Stepper() {

    const { activeStepIndex } = useContext(FormContext);

    useEffect(() => {
        const stepperItems = document.querySelectorAll(".stepper-item");
        stepperItems.forEach((step, i) => {
            if (i <= activeStepIndex) {
                step.classList.add("bg-primary", "text-white");

                if(i < activeStepIndex) step.nextSibling.classList.add('border-primary')

            } else {
                step.classList.remove("bg-primary", "text-white");
            }
        });
    }, [activeStepIndex]);

    return (
        <div className="w-full md:w-2/3 flex flex-row items-center justify-center py-4 mb-14 md:mb-16">
            <div className="flex flex-col relative">
                <div className="stepper-item flex items-center justify-center w-12 h-12 text-center font-medium border-2 rounded-full">
                    1
                </div>
                <span className="absolute -bottom-6 text-xs w-max md:-left-8">Identity <span className="hidden md:inline">For Receiver</span> </span>
            </div>

            <div className="flex-auto border-t-2"></div>

            <div className="flex flex-col relative">
                <div className="stepper-item flex items-center justify-center w-12 h-12 text-center font-medium border-2 rounded-full">
                    2
                </div>
                <span className="absolute -bottom-6 text-xs w-max md:-left-8">Amount <span className="hidden md:inline">to be send</span> </span>
            </div>
            <div className="flex-auto border-t-2"></div>
            <div className="flex flex-col relative">
                <div className="stepper-item flex items-center justify-center w-12 h-12 text-center font-medium border-2 rounded-full">
                    3
                </div>
                <span className="absolute -bottom-6 text-xs w-max md:-left-8">Share<span className="hidden md:inline"> QR Code Voucher</span> </span>
            </div>
        </div>
    );
}

export default Stepper;
