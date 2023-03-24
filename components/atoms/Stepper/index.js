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
        <div className="w-full md:w-2/3 flex flex-row items-center justify-center py-4">
            <div className="stepper-item flex items-center justify-center w-12 h-12 text-center font-medium border-2 rounded-full">
                1
            </div>
            <div className="flex-auto border-t-2"></div>
            <div className="stepper-item flex items-center justify-center w-12 h-12 text-center font-medium border-2 rounded-full">
                2
            </div>
            <div className="flex-auto border-t-2"></div>
            <div className="stepper-item flex items-center justify-center w-12 h-12 text-center font-medium border-2 rounded-full">
                3
            </div>
        </div>
    );
}

export default Stepper;
