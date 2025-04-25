import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/components'
import { ContentLayout } from '@/shared/layout'
import { useAppDispatchContext } from '@/store'
import { IPatient } from '../../domain'
import { useHandlerError } from '../../hooks'
import { HomeServices } from '../../services'
import { DataTable } from './data-table'

const columns: ColumnDef<IPatient>[] = [
  {
    accessorKey: 'pet_name',
    header: 'Mascota'
  },
  {
    accessorKey: 'owner',
    header: 'Propietario'
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            console.log(column.getIsSorted())
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: 'created_date',
    header: 'Fecha'
  },
  {
    accessorKey: 'symptoms',
    header: () => <div className="text-right">Síntomas</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const AdminHomePage = () => {
  const dispatchApp = useAppDispatchContext()

  const { data, error } = useQuery({
    queryKey: ['Patient'],
    queryFn: () => HomeServices.getList({ page: 1, limit: 10 }),
    staleTime: 1000 * 60 * 10,
    retry: 1
  })

  useHandlerError({ error, dispatchApp })

  /* const { startOpenModal } = useContext( UiContext );
  const { startActivePatient } = useAdmin();

  const handleNewPatient = () => {
    startActivePatient({ name: '', owner: '', email: '', visitDate: '', symptoms: '' });
    startOpenModal();
  } */

  return (
    <ContentLayout title="Pacientes">
      {data?.data && <DataTable columns={columns} data={data?.data} />}

      <div className="">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white bg-[#263159] hover:bg-[#324592] py-2 px-3 rounded font-medium transition-colors"
            /* onClick={ handleNewPatient } */
          >
            Agregar Paciente
          </button>
        </div>

        {/* <div className="pt-3">
        <PatientList />
      </div>

      <Modal /> */}
      </div>
    </ContentLayout>
  )
}

export default AdminHomePage
