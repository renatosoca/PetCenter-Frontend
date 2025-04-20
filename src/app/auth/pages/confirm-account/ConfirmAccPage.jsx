import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ConfirmAccountError, ConfirmAccountSuccess } from '../../components';
import { AuthContext } from '../../context';

export const ConfirmAccPage = () => {
  const { startConfirmAccount, successMessage, errorMessage } = useContext( AuthContext );
  
  const params = useParams();
  const { id } = params;
  
  useEffect( () => {
    startConfirmAccount( id );
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center px-4'>
      <div className='h-full bg-white text-gray-500 font-bold max-w-lg w-full px-4 py-6'>
        <h1 className="relative text-2xl text-black pb-5 after:absolute after:content-[''] after:top-full after:left-0 after:w-full after:h-[.1rem] after:bg-gray-400">
          Confirmando Cuenta
        </h1>

        { !!successMessage ? <ConfirmAccountSuccess /> : <ConfirmAccountError messageError={ errorMessage } /> }

      </div>
    </div>
  )
}