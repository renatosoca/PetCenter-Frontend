import usePatients from "../../hooks/usePatients";

export const Patients = ({ patient }) => {
  const { name, owner, email, date, symptoms, _id } = patient;

  const FormatDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(
      newDate
    );
  };

  return (
    <>
      <tr className="">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{owner}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {FormatDate(date)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{symptoms}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Editar</td>
      </tr>
    </>
  );
};
