import React, { createContext, useState } from 'react';
import CardHeader from '../../atoms/Card/Header';
import { CiCircleList } from 'react-icons/ci';
import DataTable from 'react-data-table-component';
import { useSession } from 'next-auth/react';
import Fetcher from '../../../lib/Fetcher';
import { FcAddressBook, FcCellPhone } from 'react-icons/fc';
import Link from 'next/link';

const businessTypes = {
  MEDICAL_CABINET: { text: 'Cabinet Médical', color: '447698' },
  CLINIC: { text: 'Clinique', color: 'A143D3' },
  HOSPITAL: { text: 'Hôpital', color: 'FF5498' },
};

const columns = [
  {
    name: "IDENTITÉ DE L'HÔPITAL",
    selector: (row) => (
      <div className="flex py-4 gap-4 w-fit">
        <div className="min-w-20 w-20 h-fit border p-3 rounded-lg flex justify-center items-center">
          <img src={row.logoLink} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="uppercase font-semibold text-md">{row.name}</span>

          <span className="text-xs text-gray-500">{row.email}</span>

          <span className="text-xs text-gray-500">{row.address}</span>

          <span className="flex gap-3 items-center text-sm text-gray-700 font-light mt-3">
            <span className="bg-orange opacity-90 px-2 py-1 text-white text-xs rounded-md w-fit flex gap-3 items-center">
              {row.packages ? row.packages.length : 0} Plan
              {row.packages.length > 1 ? 's' : ''}
            </span>
          </span>
        </div>
      </div>
    ),
  },

  {
    name: 'DÉTAILS BUSINESS',
    selector: (row) => (
      <div className="flex flex-col gap-4">
        <span
          className={`bg-gray-300 text-gray-900 py-1 pl-2 font-semibold w-fit pr-4 rounded-full opacity-80 `}
        >
          {businessTypes[row.businessType].text}
        </span>
        <div className="flex flex-col gap-1">
          <Link href={`tel:${row.phone}`} legacyBehavior>
            <span className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer">
              <FcCellPhone size={18} /> {row.phone}
            </span>
          </Link>

          <Link href={`mailto:${row.email}`} legacyBehavior>
            <span className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer">
              <FcAddressBook size={18} /> {row.email}
            </span>
          </Link>
        </div>
      </div>
    ),
  },

  {
    name: 'ACTIONS',
    button: true,
    cell: (row) => (
      <div>
        <button
          className="border border-gray-800 hover:bg-gray-800 hover:text-gray-200 font-semibold px-3 py-2 text-gray-800 text-xs rounded-md"
          onClick={(e) => alert(row.id)}
        >
          Packages
        </button>
      </div>
    ),
  },
];

const Hospital = () => {
  let { data: session } = useSession();
  const { data, isLoading, isError } = Fetcher(
    `/provider/list`,
    session.user.data.access_token,
  );

  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6 mb-20 md:mb-6">
      <CardHeader
        title={'Liste des hôpitaux'}
        filter={{
          label: {
            title: 'Trier par',
            className: 'py-1 w-[auto]',
          },
          className: 'w-[auto]',
          icon: () => <CiCircleList />,
          items: ['Detail', 'Annuler'],
        }}
      />

      <div className="border rounded-lg overflow-x-auto w-full relative">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {data.length > 0 ? (
              <DataTable
                columns={columns}
                data={data}
                fixedHeader
                className="px-8 bg-white"
                title="Liste des hôpitaux"
                persistTableHead
              />
            ) : (
              <div className="py-10 mx-auto w-1/2 flex flex-col justify-center items-center gap-4">
                <p className="text-gray-500 text-sm">
                  Aucun hôpital actuellement ajouté...
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hospital;
