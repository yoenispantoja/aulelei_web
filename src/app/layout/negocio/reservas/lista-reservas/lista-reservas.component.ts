import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  TimeScaleModel,
  EventSettingsModel,
  ScheduleComponent,
} from '@syncfusion/ej2-angular-schedule';
import { L10n, loadCldr } from '@syncfusion/ej2-base';
import { ReservasService } from 'src/app/shared/services/reservas.service';
import { enableRipple } from '@syncfusion/ej2-base';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { DTOReserva } from 'src/app/shared/models/DTOReserva';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { ServiciosService } from 'src/app/shared/services/servicios.service';
import { TrabajadoresService } from 'src/app/shared/services/trabajadores.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

declare let require: Function;
loadCldr(
  require('../../../../../../node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('../../../../../../node_modules/cldr-data/main/es/ca-gregorian.json'),
  require('../../../../../../node_modules/cldr-data/main/es/currencies.json'),
  require('../../../../../../node_modules/cldr-data/main/es/numbers.json'),
  require('../../../../../../node_modules/cldr-data/main/es/timeZoneNames.json')
);
L10n.load({
  es: {
    schedule: {
      day: 'Día',
      week: 'Semana',
      workWeek: 'Semana laboral',
      month: 'Mes',
      agenda: 'Agenda',
      weekAgenda: 'Agenda semanal',
      workWeekAgenda: 'Agenda de la semana laboral',
      monthAgenda: 'Month Agenda',
      today: 'Hoy',
      noEvents: 'Sin reservas',
      emptyContainer: 'No hay reservas programados para hoy.',
      allDay: 'Todo el día',
      start: 'Inicio',
      end: 'Fin',
      more: 'Más',
      close: 'Cerrar',
      cancel: 'Cancelar',
      noTitle: '(Sin título)',
      delete: 'Borrar',
      deleteEvent: 'Borrar reserva',
      deleteMultipleEvent: 'Borrar reservas',
      selectedItems: 'Items seleccionados',
      deleteSeries: 'Borrar series',
      edit: 'Editar',
      editSeries: 'Editar series',
      editEvent: 'Editar reserva',
      createEvent: 'Crear',
      subject: 'Título',
      addTitle: 'Añadir título',
      moreDetails: 'Más Detalles',
      save: 'Guardar',
      editContent: '¿Quieres editar sólo esta reserva o la serie entera?',
      deleteRecurrenceContent:
        '¿Quieres borrar sólo esta reserva o toda la serie?',
      deleteContent: '¿Estás seguro de que quieres borrar esta reserva?',
      deleteMultipleContent:
        '¿Estás seguro de que quieres borrar las reservas seleccionados?',
      newEvent: 'Nueva reserva',
      title: 'Título',
      location: 'Ubicación',
      description: 'Descripción',
      timezone: 'Zona horaria',
      startTimezone: 'Zona horaria inicial',
      endTimezone: 'Zona horaria final',
      repeat: 'Repetir',
      saveButton: 'Guardar',
      cancelButton: 'Cancelar',
      deleteButton: 'Borrar',
      recurrence: 'Recurrencia',
      wrongPattern: 'El patrón de recurrencia no es válido.',
      seriesChangeAlert:
        'Los cambios hechos a instancias específicas de esta serie serán cancelados y esos eventos volverán a coincidir con la serie.',
      createError:
        'La duración del evento debe ser más corta que la frecuencia con la que se produce. Acorta la duración o cambia el patrón de recurrencia en el editor de eventos de recurrencia.',
      recurrenceDateValidation:
        'Algunos meses tienen menos de la fecha seleccionada. Para estos meses, la ocurrencia caerá en la última fecha del mes.',
      sameDayAlert:
        'Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.',
      editRecurrence: 'Editar recurrencia',
      repeats: 'Repeticiones',
      alert: 'Alerta',
      startEndError:
        'La fecha final seleccionada se produce antes de la fecha de inicio.',
      invalidDateError: 'El valor de la fecha introducida no es válido.',
      ok: 'Ok',
      occurrence: 'Occurrencia',
      series: 'Series',
      previous: 'Anterior',
      next: 'Siguiente',
      timelineDay: 'Línea de tiempo diaria',
      timelineWeek: 'Línea de tiempo semanal',
      timelineWorkWeek: 'Línea de tiempo laboral',
      timelineMonth: 'Línea de tiempo mensual',
    },
    recurrenceeditor: {
      none: 'Ninguno',
      daily: 'Diariamente',
      weekly: 'Semanalmente',
      monthly: 'Mensualmente',
      month: 'Mes',
      yearly: 'Anualmente',
      never: 'Nunca',
      until: 'Hasta',
      count: 'Cuenta',
      first: 'Primero',
      second: 'Segundo',
      third: 'Tercero',
      fourth: 'Cuarto',
      last: 'Último',
      repeat: 'Repetir',
      repeatEvery: 'Repetir cada',
      on: 'Repetir en',
      end: 'Fin',
      onDay: 'Día',
      days: 'Día(s)',
      weeks: 'Semana(s)',
      months: 'Mes(es)',
      years: 'Año(s)',
      every: 'cada',
      summaryTimes: 'tiempo(s)',
      summaryOn: 'en',
      summaryUntil: 'hasta',
      summaryRepeat: 'Repeticiones',
      summaryDay: 'día(s)',
      summaryWeek: 'semana(s)',
      summaryMonth: 'mes(es)',
      summaryYear: 'año(s)',
    },
    calendar: {
      today: 'Hoy',
    },
  },
});

// enable ripple style
enableRipple(true);

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.scss'],
  animations: [routerTransition()],
  providers: [DayService, WeekService, WorkWeekService, MonthService],
})
export class ListaReservasComponent implements OnInit {
  constructor(
    private servicioServicios: ServiciosService,
    private trabajadoresService: TrabajadoresService,
    private clientesService: UsuariosService,
    private reservasService: ReservasService,
    private router: Router
  ) {

  }

  // Elementos del Scheduler
  @ViewChild('schedule', { static: true })
  public scheduleObj: ScheduleComponent;
  @ViewChild('datepicker', { static: true })
  public datepickerObj: DatePickerComponent;
  @ViewChild('autoCompleteCliente')
  public autoCompleteCliente: AutoCompleteComponent;

  // para el dropAutocomplete de los clientes

  // maps the appropriate column to fields property
  public fieldsClientes: Object = { value: 'nombre' };
  // set the placeholder to AutoComplete input
  public waterMark = 'e.g. Juan';
  // set the height of the popup element

  // para el dropAutocomplete de los servicios

  // maps the appropriate column to fields property
  public fieldsServicios: Object = { value: 'nombre' };
  // set the placeholder to AutoComplete input
  public waterMarkServicios = 'e.g. Corte de cabello';
  // set the height of the popup element

  categoriasReservas: any;

  @ViewChild('successSwal') private successSwal: SwalComponent;

  public interval = 60;

  // Elementos del Calendario
  public data: object[] = [];
  public eventSettings: EventSettingsModel;
  public timeScaleOptions: TimeScaleModel = { enable: true, slotCount: 1 };

  reservas: DTOReserva[] = [];
  estilistas: any[] = [];
  clientes: any[] = [];
  servicios: any[] = [];

  estilistaSeleccionado: number;
  idClienteSeleccionado: number;
  idServicioSeleccionado: number;
  telefono: any;

  fechaSeleccionada: any;
  horaSeleccionada: any;
  clienteSeleccionado: any;
  servicioSeleccionado: any;
  allowEditFecha: boolean;
  allowEditCliente: boolean;
  allowEditServicio: boolean;
  allowEditTelefono: boolean;

  // Carrusel con estilistas
  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    autoWidth: true,
    startPosition: 0,
    // tslint:disable-next-line: max-line-length
    navText: [
      '<i class="fa fa-arrow-circle-left" title="Anterior"></i>',
      '<i class="fa fa-arrow-circle-right" title="Siguiente"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 3,
        // margin: 20,
      },
      800: {
        items: 4,
        // margin: 20,
      },
      1000: {
        items: 5,
        // margin: 20,
      },
    },
  };

  // Elementos del timepicker
  // Elementos del Datepicker y TimePicker
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date;
  public date: number = new Date().getDate();
  public horaReserva: Date = new Date(
    this.fullYear,
    this.month,
    this.date,
    9,
    0,
    0
  );
  public minValue: Date = new Date(
    this.fullYear,
    this.month,
    this.date,
    9,
    0,
    0
  );
  public maxValue: Date = new Date(
    this.fullYear,
    this.month,
    this.date,
    18,
    0,
    0
  );

  fechaReserva: any;

  ngOnInit() {
    this.scheduleObj.locale = 'es';
    this.cargarEstilistas();
    this.cargarClientes();
  }

  eliminarReserva(id: number) {
    this.reservasService.deleteReserva(id).subscribe(
      (data) => {
        if (data) {
          this.successSwal.show();
          this.verReservasEstilista(this.estilistaSeleccionado);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarEstilistas() {
    this.trabajadoresService.getTrabajadores().subscribe((datos) => {
      const resultados = datos['items'];
      // Filtro solo los estilistas
      this.estilistas = resultados.filter(estilista => estilista.usuario.rol.id === 5);
      this.estilistaSeleccionado = this.estilistas[0].id;
      this.verReservasEstilista(this.estilistaSeleccionado);
    });
  }

  cargarClientes() {
    this.clientesService.getUsuarios().subscribe((datos) => {
      this.clientes = datos['items'];
    });
  }

  verReservasEstilista(idEstilista: number) {
    this.estilistaSeleccionado = idEstilista;
    // Limpio el calendrio por si el usuario retrocede
    this.data = [];
    this.reservasService
      .getReservasTrabajador(idEstilista)
      .subscribe((datos) => {
        this.reservas = datos['items'];
        // voy llenado el arreglo de reservas del schedule
        this.reservas.map((reserva) => {
          // Dandole formato ajustado a la reserva
          const fechaReserva = new Date(reserva.fecha);
          const horaReserva = new Date(reserva.hora);
          const anno = fechaReserva.getFullYear();
          const mes = fechaReserva.getMonth();
          const dia = fechaReserva.getDate();
          const horaInicio = horaReserva.getHours();
          const horaFin = horaInicio + 1;
          // Construyo la data personalizada
          this.data.push({
            Id: reserva.id,
            Subject: 'RESERVADO',
            StartTime: new Date(anno, mes, dia, horaInicio, 0),
            EndTime: new Date(anno, mes, dia, horaFin, 0),
            Cliente: reserva.usuarioId,
            Trabajador: reserva.trabajadorId,
            Servicio: reserva.servicio.id,
            Telefono: reserva.telefono,
          });
        });
        // Se la asigno al calendario
        this.eventSettings = {
          dataSource: this.data,
        };
      });
    // monto sus servicios
    this.trabajadoresService
      .showTrabajador(this.estilistaSeleccionado)
      .subscribe((datos) => {
        this.servicios = datos['items'].servicios;
      });
  }

  getNombreEstilista() {
    const estilista = this.estilistas.find((estilista) => estilista.id === this.estilistaSeleccionado);
    return estilista['nombre_completo'];
  }

  setNombreCliente(id: number) {
    this.clientesService.showUsuario(id).subscribe((resultado) => {
      this.clienteSeleccionado = resultado['items'].nombre;
    });
  }

  setNombreServicio(id: number) {
    this.servicioServicios.showServicio(id).subscribe((resultado) => {
      this.servicioSeleccionado = resultado['items'].nombre;
    });
  }

  formatearFecha(fecha: Date) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    return  `${day}/${month}/${year}`;
  }

  formatearHora(hora: Date) {
    const hour = hora.getHours() > 12 ? hora.getHours() - 12 : hora.getHours();
    const minutes = 0;
    const session = hora.getHours() > 12 ? 'PM' : 'AM';
    return  `${hour}:${minutes}0 ${session}`;
  }

  estaSeleccionado(id: number) {
    if (id === this.estilistaSeleccionado) {
      return 'estilistaSeleccionado';
    } else {
      return '';
    }
  }

  nuevoEvento(evento: any) {
    this.fechaReserva = evento.startTime;
    this.allowEditFecha = false;
    this.allowEditCliente = true;
    this.allowEditServicio = true;
    this.allowEditTelefono = true;
  }

  clickAlEvento(evento: any) {
    this.fechaReserva = evento.event.StartTime;
    this.horaReserva = evento.event.StartTime;
    this.setNombreCliente(evento.event.Cliente);
    this.setNombreServicio(evento.event.Servicio);
    this.telefono = evento.event.Telefono;
    this.allowEditFecha = true;
    this.allowEditCliente = false;
    this.allowEditServicio = true;
    this.allowEditTelefono = false;
  }

  public onActionBegin(args: { [key: string]: Object }): void {
    let data: any;
    switch (args.requestType) {
      case 'eventChange':
        {
          data = <any>args.data;
          // Verifico si puede actualizar a otra fecha y hora
          if (this.puedeCambiarReserva()) {
            // La modifico y vuelvo a cargar el calendario
            const reserva = {
              fecha: this.fechaReserva,
              hora: this.horaReserva,
              estado: 0,
              servicio: this.idServicioSeleccionado,
              trabajador: data.Trabajador,
              usuario: data.Cliente,
            };
            this.reservasService
              .editReserva(data.Id, reserva)
              .subscribe((res) => {
                swal({
                  title: '<strong>Información</strong>',
                  type: 'info',
                  text: 'Su reserva ha sido reagendada',
                }).then((result) => {
                  if (result.value) {
                    this.verReservasEstilista(data.Trabajador);
                  }
                });
              });
          } else {
            swal({
              title: '<strong>Su reserva no ha podido reagendarse</strong>',
              type: 'error',
              text: 'No hay disponibilidad en esa fecha y esa hora',
            });
          }
        }
        break;
      case 'eventRemove': {
        data = <any>args.data;
        this.eliminarReserva(data[0].Id);
        break;
      }
      case 'eventCreate': {
        if (this.puedeCambiarReserva()) {
          const reserva = {
            fecha: this.fechaReserva,
            hora: this.horaReserva,
            estado: 0,
            servicio: this.idServicioSeleccionado,
            trabajador: this.estilistaSeleccionado,
            usuario: this.idClienteSeleccionado,
            telefono: this.telefono,
          };
          this.reservasService.addReserva(reserva).subscribe((res) => {
            swal({
              title: '<strong>Información</strong>',
              type: 'info',
              text: 'Su reserva ha sido agendada',
            }).then((result) => {
              if (result.value) {
                this.verReservasEstilista(this.estilistaSeleccionado);
              }
            });
          });
        } else {
          swal({
            title: '<strong>Su reserva no ha podido agendarse</strong>',
            type: 'error',
            text: 'No hay disponibilidad en esa hora',
          });
        }
        break;
      }
    }
  }

  puedeCambiarReserva(): boolean {
    // Antes de enviar al server para el registro de la reserva, verifico que no coincide con las ya realizadas
    const puedeReservar =
      this.reservas.filter((reserva: DTOReserva) => {
        const fechaReservada = this.formatearFecha(new Date(reserva.fecha));
        const fechaSolicitada = this.formatearFecha(
          new Date(this.fechaReserva)
        );
        const horaReservada = this.formatearHora(new Date(reserva.hora));
        const horaSolicitada = this.formatearHora(new Date(this.horaReserva));
        return (
          fechaReservada === fechaSolicitada && horaReservada === horaSolicitada
        );
      }).length === 0;

    return puedeReservar;
  }

  public seleccionarCliente(args: any): void {
    if (args.item != null) {
      this.idClienteSeleccionado = args.itemData.id;
    }
  }

  public seleccionarServicio(args: any): void {
    if (args.item != null) {
      this.idServicioSeleccionado = args.itemData.id;
    }
  }

  enableClick(args) {
    args.cancel = true;
  }
}
