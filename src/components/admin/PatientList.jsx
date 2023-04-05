import { useContext } from "react";
import { PatientContext } from "../../context";
import { SkeletonPatients } from "./SkeletonPatients";
import { Patients } from "./Patients";

export const PatientList = () => {
  const { patients, isLoadingPatients } = useContext(PatientContext);

  return (
    <>
      <h2 className="font-black text-3xl text-center pb-6">
        Listado de Pacientes
      </h2>
      
      <div className={`${ patients?.length ? 'overflow-x-auto': '' }`}>
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-xs font-bold text-gray-700 uppercase">
                Mascota
              </th>
              <th className="px-2 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Propietario
              </th>
              <th className="px-2 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Correo
              </th>
              <th className="px-2 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-2 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Sintomas
              </th>
              <th className="px-2 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoadingPatients ? 
              <SkeletonPatients />  :
              ( patients?.length > 0 && (
                patients.map( (patient) => (
                  <Patients key={patient._id} patient={patient} />
                ))
              ))
            }
          </tbody>
        </table>
        {patients?.length <= 0 && <div className="text-center w-full">En este espacio se mostrarán tus pacientes</div>}
      </div>
    </>
  );
}
