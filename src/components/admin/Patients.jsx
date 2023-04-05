import { useContext } from "react";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { useAdmin } from "../../hooks";
import { UiContext } from "../../context";

export const Patients = ({ patient }) => {
  const { startActivePatient, startDeletePatient } = useAdmin()
  const { startOpenModal } = useContext( UiContext );

  const { name, owner, email, visitDate, symptoms, _id } = patient;
  
  const FormatDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format( newDate );
  };

  const handleEditPatient = () => {
    const newDate = new Date(visitDate);
    const dateFormated = newDate.toISOString().slice(0, 10);
    startActivePatient({ name, owner, email, visitDate: dateFormated, symptoms, _id });
    startOpenModal();
  }

  return (
    <>
      <tr className="">
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{owner}</td>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{email}</td>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
          {FormatDate(visitDate)}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{symptoms}</td>
        <td className="px-6 whitespace-nowrap font-medium text-gray-900">
          <div className="flex justify-center items-center h-full gap-3 text-2xl">
            <button>
              <FaUserEdit
                onClick={handleEditPatient}
              />
            </button>
            <button>
              <AiFillDelete 
                onClick={ () => startDeletePatient(_id) }
              />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
