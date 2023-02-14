import Head from 'next/head'
import { getSession, useSession, signOut } from "next-auth/react"
import Dashboard from '../layouts/Dashboard'

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