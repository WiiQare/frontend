import { ONBOARDING_SLIDES } from "../../../utils/constants";
import React from "react";

import WelcomeSlider from "../WelcomeSlider";

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  autoplay: false,
  speed: 200,
};

const OnboardingScreen = ({ onStartClick }) => (
  <WelcomeSlider
    slides={[
      ...ONBOARDING_SLIDES,
      {
        img: "/images/Easy-payment-scan-QR-code.png",
        title: "Making a payment is ABC <span>simple</span>",
        subtitle: "To make a payment, simply scan a QR code.",
        button: {
          label: "Get Started",
          onClick: onStartClick,
        },
      },
    ]}
    settings={settings}
  />
);

export default OnboardingScreen;
