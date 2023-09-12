import React, { useContext, useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormContext } from '../../../../pages/voucher/buy';
import Image from 'next/image';
import logoDark from '../../../../public/images/logo_dark_2.png';
import Link from 'next/link';
import Fetcher from '../../../../lib/Fetcher';
import { HiExclamation, HiLockClosed, HiOutlineEye } from 'react-icons/hi';
import { useRouter } from 'next/router';
import LoadingButton from '../../Loader/LoadingButton';
import { useMutation } from 'react-query';
import { sendSMSHash } from '../../../../lib/helper';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Toast from '../../Toast';
import { CurrencyFlag } from 'react-currency-flags/dist/components';

function KYC() {
  const [statusID, setStatusID] = useState('IN_PROGRESS');
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    kycTest,
    setKycTest,
  } = useContext(FormContext);
  const router = useRouter();

  const checkStatus = async () => {
    try {
      const response = fetch('/api/authologic/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: router.query.conversation,
        }),
      });

      const jsonData = (await response).json();

      jsonData
        .then((data) => {
          console.log(data);
          if (data.status != 'FINISHED') {
            setTimeout(checkStatus, 8000);
          } else {
            setKycTest(false);
          }
        })
        .catch((e) => setTimeout(checkStatus, 8000));
    } catch (error) {
      console.log(error);
      setTimeout(checkStatus, 8000);
    }
  };

  useEffect(() => {
    if (!router.query.conversation) {
      fetch('/api/authologic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: router.asPath + '?step=1',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          router.push(data.url);
        })
        .catch((e) => console.log(e));
    } else {
      checkStatus();
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      {!router.query.conversation ? (
        <>{"Verification d'identité..."}</>
      ) : (
        <>
          {statusID == 'IN_PROGRESS' ? (
            <>{"Vérification d'identité en cours"}</>
          ) : (
            <>
              {statusID != 'FINISHED' ? (
                <>{'Identity vérification failed'}</>
              ) : (
                ''
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default KYC;
