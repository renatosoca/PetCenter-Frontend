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

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout
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