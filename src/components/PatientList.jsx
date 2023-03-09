import { useContext } from "react";
import { PatientContext } from "../context";
import { Patients } from "./admin/Patients";

const PatientList = () => {
  const { patients } = useContext(PatientContext);

  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de Pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          
          <div class="overflow-x-auto">
            <table class="table-auto min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mascota
                  </th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propietario
                  </th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sintomas
                  </th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <Patients key={patient._id} patient={patient} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes y {""}
            <span className="text-indigo-600 font-bold">
              aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default PatientList;
