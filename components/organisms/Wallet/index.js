import { CiSquarePlus } from 'react-icons/ci';
import CardHeader from '../../atoms/Card/Header';
import WalletBalance from './Balance';

import { Button } from 'flowbite-react';
import Link from 'next/link';

const Wallet = () => {
  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6 mb-12">
      <CardHeader title={'Épargne de Santé'} download={false}>
        <Link href={'/saving/new'} legacyBehavior>
          <Button className="bg-primary">
            <CiSquarePlus className="mr-2 h-5 w-5" />
            Nouvelle épargne
          </Button>
        </Link>
      </CardHeader>

      <WalletBalance
        wallet={{
          amount: '0.00',
          valid: '08/21',
          holder: 'Peter NDENGO',
          number: '**** **** **** 1234',
          progress: 45,
        }}
        progresses={{
          installment: {
            percent: 62,
            amount: '5,412',
          },
          investment: {
            percent: 89,
            amount: '10,619',
          },
          property: {
            percent: 41,
            amount: '1,282',
          },
        }}
      />

      {/* <HistoryWallet /> */}
    </div>
  );
};

export default Wallet;
