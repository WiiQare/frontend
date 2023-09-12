import { CiSquarePlus } from 'react-icons/ci';
import CardHeader from '../../atoms/Card/Header';
import WalletBalance from './Balance';

import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Fetcher from '../../../lib/Fetcher';

const Wallet = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = Fetcher(
    `/savings/${session.user.data.userId}`,
    session.user.data.access_token,
  );

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

      <WalletBalance data={{ data, isLoading }} />

      {/* <HistoryWallet /> */}
    </div>
  );
};

export default Wallet;
