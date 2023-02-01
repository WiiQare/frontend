import Head from 'next/head'
import { getSession, useSession, signOut } from "next-auth/react"

export default function Home() {

	const { data:session } = useSession()
	
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
			

			{session ? <User session={session} handleSignOut={handleSignOut} /> : <Guest />}
		</>
	)
}

function User({session, handleSignOut}) {
	return (
		<main>
			Homepage
		</main>
	)
}

function Guest() {
	return (
		<main className='container mx-auto text-center py-20 space-y-8'>
			<h3 className="text-4xl font-bold">Guest User</h3>
		</main>
	)
}

export async function getServerSideProps({req}) {
	const session = await getSession({req})

	if(!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	return {props: {session}}
}