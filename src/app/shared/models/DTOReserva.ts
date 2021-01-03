import { DTOServicio } from './DTOServicio';


export class DTOReserva {
  id: number;
  fecha: Date;
  hora: Date;
  servicio: DTOServicio;
  telefono: string;
  trabajadorId: number;
  usuarioId: number;
  estado: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
