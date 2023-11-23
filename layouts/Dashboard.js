import { useRouter } from 'next/router';
import Menu from '../components/molecules/Navbar';
import MenuBottom from '../components/molecules/Navbar/Bottom';
import Sidebar from '../components/molecules/Sidebar/Index';
import { useSession, signOut } from 'next-auth/react';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { DrawContext } from '../pages/_app';

const Dashboard = ({ children, className }) => {
  const { pathname } = useRouter();
  const { status, data } = useSession();
  const { hideSide } = useContext(DrawContext);

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/login');
    console.log(status, data);
  }, [status]);

  const handleSignOut = () => {
    signOut();
  };

  if (status === 'authenticated')
    return (
      <>
        <div id="portal-modal"></div>
        <Menu session={data} handleSignOut={handleSignOut} />
        <main
          className={`min-h-[90vh] grid ${
            hideSide ? 'md:grid-cols-12' : 'md:grid-cols-5'
          } gap-6 mt-20`}
        >
          <Sidebar activePath={pathname} />
          <div></div>
          <div
            className={`${className} ${
              hideSide ? 'col-span-11' : 'col-span-4'
            } p-4 overflow-x-hidden bg-[#f0f4fd]`}
          >
            {children}
          </div>
        </main>
        <MenuBottom activePath={pathname} />
      </>
    );

  return (
    <>
      <div className="flex animate-pulse">
        <div className="w-1/4 bg-gray-100 h-screen hidden md:flex"></div>
        <div className="w-full space-y-7">
          <div className="bg-gray-100 h-10 shadow-sm"></div>

          <div className="px-20 w-2/3 h-full flex flex-col justify-center mx-auto">
            <div className="flex-shrink-0">
              <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
            </div>

            <div className="ml-4 mt-2 w-full mb-8">
              <h3
                className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
                style={{ width: '40%' }}
              ></h3>

              <ul className="mt-5 space-y-3">
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
              </ul>
            </div>

            <div className="flex-shrink-0">
              <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
            </div>

            <div className="ml-4 mt-2 w-full">
              <h3
                className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
                style={{ width: '40%' }}
              ></h3>

              <ul className="mt-5 space-y-3">
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
