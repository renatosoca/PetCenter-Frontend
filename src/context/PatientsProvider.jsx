import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PatientsContext = createContext();

const PatientsProvider = ({children}) => {
    const [ patients, setPatients ] = useState([]);
    const [ patient, setPatient ] = useState( {} );

    const { auth } = useAuth();

    useEffect( () => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                if ( !token ) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ token }`
                    }
                };
                const { data } = await clienteAxios( '/pacientes', config )
                setPatients(data);
            } catch (error) {
                console.error(error);
            };
        };
        getPatients();
    }, [auth]);

    const savePatient = async ( patient ) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if ( patient.id ) {
            //Editar
            try {
                const { data } = await clienteAxios.put(`/pacientes/${patient.id}`, patient, config );
                
                const UpdatePatients = patients.map( patientStated => patientStated._id === data._id ? data : patientStated );
                setPatients( UpdatePatients );
            } catch (error) {
                console.error(error.response.data.msg);
            };
        } else {
            //Crear
            try {
                const { data } = await clienteAxios.post('/pacientes', patient, config );
                const { createdAt, updatedAt, __v, ...storedPatient } = data;
                
                setPatients( [storedPatient, ...patients] )
            } catch (error) {
                console.error(error.response.data.msg);
            };
        };
    };

    const setEdition = ( patient ) => {
      setPatient( patient );
    };

    const deletePatient = async ( patient) => {
        const confirmed = confirm(`¿Deseas Eliminar a ${patient.nombre} ?`);
        if (confirmed) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await clienteAxios.delete( `/pacientes/${patient._id}`, config );
                const UpdatePatients = patients.filter( patientStated => patientStated._id !== patient._id );

                setPatients( UpdatePatients );
            } catch (error) {
                console.log(error);
            };
        }
    };

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdition,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
};

export { PatientsProvider };
export default PatientsContext;