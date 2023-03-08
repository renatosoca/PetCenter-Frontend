import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {petCenterApi} from '../api';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [ accountConfirm, setAccountConfirm ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ alert, setAlert ] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect( () => {
    const confirmaccount = async () => {
      try {
        const { data } = await petCenterApi(`/veterinarios/confirmar/${id}`);
        
        setAccountConfirm(true);
        setAlert( { msg: data.msg, error: false } )
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      };

      setLoading(false);
    }
    confirmaccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-5xl text-center lg:px-16">
         Confirma tu Cuenta y Empieza a Administrar tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { !loading && <Alert objAlert={alert} />}
        { accountConfirm && (
          <Link 
            to="/"
            className='font-bold block text-center my-5 text-gray-500'>
            <span className='text-indigo-600'> Inicia Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;