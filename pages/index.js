import Head from 'next/head'
import { getSession, useSession, signOut } from "next-auth/react"
import Dashboard from '../layouts/Dashboard'
import WithQR from '../components/atoms/Card/Debit/withQR'
import { CiDollar, CiInboxIn } from "react-icons/ci";

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
			<Dashboard>
				<div className='p-2 md:py-8 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12'>
					<div className='md:min-w-4/5 flex'>
						<WithQR />
					</div>

					<div className='bg-white drop-shadow-sm rounded-xl py-6 px-24 flex flex-col justify-center items-center gap-8 w-fit'>
						<CiInboxIn size={80} className="text-sky"/>
						<div className='space-y-3 text-center w-full'>
							<h1 className='text-gray-800 text-lg'>Invite your friends</h1>
							<button className='flex bg-sky px-4 py-4 justify-center text-white items-center rounded-xl hover:shadow-md gap-2 w-auto md:w-52'>
								<CiDollar size={25} />
								<span className='text-xs font-light'>Earn Budges for 10$</span>
							</button>
						</div>
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