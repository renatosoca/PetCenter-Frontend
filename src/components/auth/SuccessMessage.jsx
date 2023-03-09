import React from 'react'
import { useContext } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { AuthContext } from '../../context';

export const SuccessMessage = ({ title = true, messageSuccess }) => {
  const { startClearMessageSuccess } = useContext( AuthContext );

  const handleClearError = () => {
    startClearMessageSuccess()
  }

  return (
    <div className='absolute top-1/3 w-full flex items-center justify-center'>
      <div className="relative max-w-xs min-h-[4rem] bg-green-300 text-white px-14 py-6 border-l-8 border-blue-500 rounded-lg">

        { title && <p className='font-bold text-gray-700 uppercase text-base'>Mensaje de exito</p> }
        <p className="text-base text-gray-500">{ messageSuccess }</p>

        <button
          type='button'
          className='absolute right-2 top-2 text-3xl font-bold text-blue-500 rounded-full'
          onClick={ handleClearError }
        >
          <IoCloseCircle />
        </button>
      </div>
    </div>
  )
}
