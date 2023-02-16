import { useRouter } from "next/router";
import Menu from "../components/molecules/Navbar";
import MenuBottom from "../components/molecules/Navbar/Bottom";
import Sidebar from "../components/molecules/Sidebar/Index";

const Dashboard = ({children, className}) => {
    const { pathname } = useRouter()

    return (
        <>
			<Menu />
            <main className="min-h-[90vh] grid md:grid-cols-4 gap-6 mt-20">
                <Sidebar activePath={pathname}/>
                <div className={`${className} col-span-3 p-4 overflow-x-hidden`}>
                    {children}
                </div>
            </main>
            <MenuBottom activePath={pathname}/>
        </>
    );
}

export default Dashboard;