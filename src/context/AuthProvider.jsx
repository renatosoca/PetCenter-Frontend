import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [ loading, setLoading ] = useState( true );
    const [ auth, setAuth ] = useState({});

    useEffect( () => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if ( !token ) return setLoading( false );

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`
                }
            };

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config );
                
                setAuth( data );
            } catch (error) {
                console.log(error);
                setAuth( {} );
            };
            setLoading( false );
        };
        authUser();
    }, []);

    const logout = () => {
        localStorage.removeItem( 'token' );
        setAuth( {} );
    };

    const editProfile = async (datos) => {
        const token = localStorage.getItem('token');
        if ( !token ) return setLoading( false );

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`
            }
        };
        try {
            await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);
            return { msg: 'Almacenado Correctamente', error: false }
        } catch (error) {
            return { msg: error.response.data.msg, error: true }
        }
    };

    const saveNewPassword = async ( datos ) => {
        const token = localStorage.getItem('token');
        if ( !token ) return setLoading( false );

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`
            }
        };
        
        try {
            const { data } = await clienteAxios.put('/veterinarios/actualizar-password', datos, config );
            
            return { msg: data.msg, error: false }
        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout,
                editProfile,
                saveNewPassword
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export {
    AuthProvider
};

export default AuthContext;