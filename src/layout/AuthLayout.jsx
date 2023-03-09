import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const AuthLayout = () => {
  const { status } = useContext( AuthContext );

  return (
    <>
      <main className='flex items-center justify-center xl:grid xl:grid-cols-2 min-h-screen w-full bg-[#1F2023]'>
        { status === 'authenticated' ? <Navigate to='/admin/' /> : <Outlet /> }
      </main>
    </>
  )
};