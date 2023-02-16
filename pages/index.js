import Head from 'next/head'
import { getSession, useSession, signOut } from "next-auth/react"
import Image from 'next/image';
import { CiCircleList, CiDollar, CiFilter, CiInboxIn } from "react-icons/ci";

import Dashboard from '../layouts/Dashboard'
import WithQR from '../components/atoms/Card/Debit/withQR'
import DropdownFilter from '../components/atoms/Dropdown/Filter';

import drc from "../public/images/drc.png"
import CardProvider from '../components/atoms/Card/Provider';

const filters = [
	{
		label: "Sort By",
		icon: () => (<CiCircleList /> ),
		items: ["Provider", "Price: Highest to Lowest", "Price: Lowest to Highest"]
	},

	{
		label: "Category",
		icon: () => (<CiFilter /> ),
		items: ["All", "Comprehensive Care", "TeleHealth", "At Home Care", "Speciality"]
	},

	{
		label: "Monthly budget",
		icon: () => (<CiCircleList /> ),
		items: ["100$", "200$", "300$", "400$"]
	},

]

export default function Home() {

	const { data: session } = useSession()

	const handleSignOut = () => {
		signOut()
	}

	return (
		<>
			<Head>
				<title>JAMII - UNICEF CRYPTO</title>
				<meta name="description" content="Payé les soins à vos familles depuis l'étranger" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			{!session ? <User session={session} handleSignOut={handleSignOut} /> : <></>}
		</>
	)
}

function User({ session, handleSignOut }) {
	return (
		<main className='bg-[#F9F9F9]'>
			<Dashboard className="space-y-8">
				<div className='p-2 md:py-8 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12'>
					<div className='md:min-w-4/5 flex'>
						<WithQR />
					</div>

					<div className='bg-white drop-shadow-sm rounded-xl py-6 px-24 flex flex-col justify-center items-center gap-8 w-fit'>
						<CiInboxIn size={80} className="text-sky" />
						<div className='space-y-3 text-center w-full'>
							<h1 className='text-gray-800 text-lg'>Invite your friends</h1>
							<button className='flex bg-sky px-4 py-4 justify-center text-white items-center rounded-xl hover:shadow-md gap-2 w-auto md:w-52'>
								<CiDollar size={25} />
								<span className='text-xs font-light'>Earn Budges for 10$</span>
							</button>
						</div>
					</div>
				</div>

				<div className="px-4 space-y-4">
					<h1 className='md:text-2xl text-gray-700 font-bold flex-wrap flex items-center gap-2 text-lg'>You are viewing care plans in country <Image src={drc} loading="lazy" className='w-6'/> DR Congo</h1>
					<div className='flex gap-2 flex-col md:flex-row md:gap-4 justify-between items-center'>
						
						{filters.map((item, i) => <DropdownFilter {...item} key={i} />)}

					</div>
					<div className='space-y-6'>
						<CardProvider />
						<CardProvider />
						<CardProvider />
						<CardProvider />
					</div>
				</div>
			</Dashboard>
		</main>
	)
}

export async function getServerSideProps({ req }) {
	const session = await getSession({ req })

	if (session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	return { props: { session } }
}