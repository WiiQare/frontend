import { ONBOARDING_SLIDES } from '../../../utils/constants';
import React from 'react';

import WelcomeSlider from '../WelcomeSlider';

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
        img: '/images/Easy-payment-scan-QR-code.png',
        title: 'Faire un paiement est un ABC <span>simple</span>',
        subtitle: 'Pour effectuer un paiement, Scannez simplement un QR Code',
        button: {
          label: 'Commencez Maintenant',
          onClick: onStartClick,
        },
      },
    ]}
    settings={settings}
  />
);

export default OnboardingScreen;
