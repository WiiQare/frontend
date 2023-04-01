import { useRouter } from "next/router";
import Menu from "../components/molecules/Navbar";
import MenuBottom from "../components/molecules/Navbar/Bottom";
import Sidebar from "../components/molecules/Sidebar/Index";
import { useSession, signOut } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Dashboard = ({ children, className }) => {
	const { pathname } = useRouter();
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') Router.replace('/login')
		console.log(status, data);
	}, [status]);

	const handleSignOut = () => {
		signOut();
	};

	if (status === 'authenticated')
		return (
			<>
				<Menu session={data} handleSignOut={handleSignOut} />
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
		);

	return (<>
		<div class="flex animate-pulse">
			<div className="w-1/4 bg-gray-100 h-screen hidden md:flex"></div>
			<div className="w-full space-y-7">
				<div className="bg-gray-100 h-10 shadow-sm"></div>

				<div className="px-20 w-2/3 h-full flex flex-col justify-center mx-auto">
					<div class="flex-shrink-0">
						<span class="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
					</div>

					<div class="ml-4 mt-2 w-full mb-8">
						<h3 class="h-4 bg-gray-200 rounded-md dark:bg-gray-700" style={{ width: "40%" }}></h3>

						<ul class="mt-5 space-y-3">
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
						</ul>
					</div>

					<div class="flex-shrink-0">
						<span class="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
					</div>

					<div class="ml-4 mt-2 w-full">
						<h3 class="h-4 bg-gray-200 rounded-md dark:bg-gray-700" style={{ width: "40%" }}></h3>

						<ul class="mt-5 space-y-3">
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</>)
};

export default Dashboard;
