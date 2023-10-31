import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../../pages/voucher/buy';
import { useRouter } from 'next/router';
import { checkKyc, setKyc } from '../../../../lib/helper';
import { useSession } from 'next-auth/react';

function KYC() {
  const [statusID, setStatusID] = useState('IN_PROGRESS');
  const [resultKYC, setResultKYC] = useState(null);
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    kycTest,
    setKycTest,
  } = useContext(FormContext);
  const { data: session } = useSession();
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

          if (data.status != 'FINISHED') {
            setTimeout(checkStatus, 8000);
          } else {
            setStatusID("FINISHED")
            if (data.result.identity.status != "FAILED") {
              setKyc({ accessToken: session.accessToken, expire: "2023/05", cardID: "ABCD", birthday: "1990-01-01", kyc: true })
              setKycTest(false)
            } else {
              setResultKYC(data.result)
            }
          }
        })
        .catch((e) => setTimeout(checkStatus, 8000));
    } catch (error) {
      setTimeout(checkStatus, 8000);
    }
  };

  const conversation = () => {
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
  }

  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`);
          const data = await response.json();

          console.log(data.continent);

          if (/Afrique/i.test(data.continent)) {
            setKycTest(false)

          } else {
            checkKyc({ accessToken: session.accessToken }).then((data) => {
              if (data) {
                setKycTest(false)
              } else {
                conversation()
              }
            }).catch((error) => conversation())
          }
        } catch (error) {
          checkKyc({ accessToken: session.accessToken }).then((data) => {
            if (data) {
              setKycTest(false)
            } else {
              conversation()
            }
          }).catch((error) => conversation())
        }
      }, (error) => {
        checkKyc({ accessToken: session.accessToken }).then((data) => {
          if (data) {
            setKycTest(false)
          } else {
            conversation()
          }
        }).catch((error) => conversation())

      });
    } else {
      checkKyc({ accessToken: session.accessToken }).then((data) => {
        if (data) {
          setKycTest(false)
        } else {
          conversation()
        }
      }).catch((error) => conversation())
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
                <>
                  {
                    resultKYC?.identity?.status == "FAILED" ? (
                      <div className='flex flex-col items-center justify-center gap-6 text-center'>
                        <img src='https://i.goopics.net/2askzc.png' alt='Mismatch' className='w-48 opacity-90' />
                        <span className='text-gray-400 text-sm'>{resultKYC?.identity?.errors.toString()}</span>
                      </div>
                    ) : ''
                  }
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default KYC;
