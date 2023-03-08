import { useContext } from 'react';
import { MdOutlineError, MdClose } from 'react-icons/md';

import { AuthContext } from '../../context';

export const WarningMessage = ({ messageError }) => {
  const { startClearMessageError } = useContext( AuthContext );
  
  const handleClearError = () => {
    startClearMessageError();
  }

  return (
    <div className='absolute top-[95%] w-full flex items-center justify-center'>
      <div className="relative max-w-xs bg-red-400 text-white px-14 py-6 border-l-8 border-red-600 rounded-lg">
        <MdOutlineError className='absolute left-3 top-5 text-red-600 text-[1.4rem]' />

        <span className="min-h-min text-sm font-bold">{ messageError }</span>

        <button
          type='button'
          className='absolute right-4 top-5 text-2xl font-bold'
          onClick={ handleClearError }
        >
          <MdClose />
        </button>
      </div>
    </div>
  )
}
