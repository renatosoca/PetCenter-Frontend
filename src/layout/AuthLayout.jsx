import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <main className='flex items-center justify-center xl:grid xl:grid-cols-2 min-h-screen w-full bg-[#1F2023]'>
      <Outlet />
    </main>
  )
};