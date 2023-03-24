import React, { useContext } from "react";
import { FormContext } from "../../../pages/voucher/buy";
import Identity from "./Forms/identity";
import Payment from "./Forms/payment";
import Send from "./Forms/send";


function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;

  switch (activeStepIndex) {
    case 0:
      stepContent = <Identity />;
      break;

    case 1:
      stepContent = <Payment />;
      break;
    case 2:
      stepContent = <Send />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
