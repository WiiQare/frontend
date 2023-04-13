import React, { useContext } from "react";
import { FormContext } from "../../../pages/voucher/buy";
import Identity from "./Forms/identity";
import Payment from "./Forms/payment";
import Send from "./Forms/send";
import Identity2 from "./Forms/identity2";
import Payment2 from "./Forms/payment2";


function Step({data}) {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;

  switch (activeStepIndex) {
    case 0:
      stepContent = <Identity2 />;
      break;

    case 1:
      stepContent = <Payment2 data={data} />;
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
