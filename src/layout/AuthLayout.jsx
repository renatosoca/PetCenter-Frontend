import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
        <main className='container mx-auto md:grid md:grid-cols-2 gap-16 py-10 lg:px-10 items-center'>
          <Outlet />
        </main>
    </>
  )
};

export default AuthLayout;