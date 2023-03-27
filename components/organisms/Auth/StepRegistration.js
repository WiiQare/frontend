import React, { useContext } from "react";
import Email from "./Forms/email";
import Information from "./Forms/informations";
import Otp from "./Forms/otp";
import { FormContextRegister } from "./RegisterForm";

function StepRegistration() {

  const { activeStep } = useContext(FormContextRegister);
  let stepContent;

  switch (activeStep) {
    case 0:
      stepContent = <Email />;
      break;

    case 1:
      stepContent = <Otp />;
      break;
    case 2:
      stepContent = <Information />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default StepRegistration;
