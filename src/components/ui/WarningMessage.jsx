import { useContext } from 'react';
import { MdOutlineError, MdClose } from 'react-icons/md';

import { AuthContext } from '../../context';

export const WarningMessage = ({ messageError }) => {
  const { startClearMessageError } = useContext( AuthContext );
  
  const handleClearError = () => {
    startClearMessageError();
  }

  return (
    <div className='absolute top-full w-full flex items-center justify-center'>
      <div className="relative max-w-xs min-h-[4rem] bg-[#2E2F36] text-white px-14 py-6 border-l-8 border-red-500 rounded-lg">
        <MdOutlineError className='absolute left-3 top-5 text-red-500 text-[1.4rem]' />

        <p className="text-sm">{ messageError }</p>

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
