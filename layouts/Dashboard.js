import { useRouter } from "next/router";
import Menu from "../components/molecules/Navbar";
import MenuBottom from "../components/molecules/Navbar/Bottom";
import Sidebar from "../components/molecules/Sidebar/Index";
import { useSession, signOut } from "next-auth/react";

const Dashboard = ({ children, className }) => {
	const { pathname } = useRouter();
	const { data: session } = useSession();

	const handleSignOut = () => {
		signOut();
	};

	return (
		<>
			{session ? (
				<>
					<Menu session={session} handleSignOut={handleSignOut} />
					<main className="min-h-[90vh] grid md:grid-cols-5 gap-6 mt-20">
						<Sidebar activePath={pathname} />
						<div
							className={`${className} col-span-4 p-4 overflow-x-hidden bg-[#f0f4fd]`}
						>
							{children}
						</div>
					</main>
					<MenuBottom activePath={pathname} />
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Dashboard;
