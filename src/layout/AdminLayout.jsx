import { Outlet, Navigate } from "react-router-dom";
import { useForm, useAuth } from '../hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminLayout = () => {
    const { auth, loading } = useAuth();

    if ( loading ) return 'Cargando...';

    return (
        <>
            <Header />
                { auth?._id ?
                    (   <main className="container mx-auto mt-10">
                            <Outlet />
                        </main>
                    )
                    : <Navigate to='/' />}
            <Footer />
        </>
    );
};

export default AdminLayout;
