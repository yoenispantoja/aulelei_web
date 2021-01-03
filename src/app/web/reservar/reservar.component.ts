import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiciosService } from '../../shared/services/servicios.service';
import { TrabajadoresService } from '../../shared/services/trabajadores.service';
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


declare let require: Function;
loadCldr(
  require('../../../../node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('../../../../node_modules/cldr-data/main/es/ca-gregorian.json'),
  require('../../../../node_modules/cldr-data/main/es/currencies.json'),
  require('../../../../node_modules/cldr-data/main/es/numbers.json'),
  require('../../../../node_modules/cldr-data/main/es/timeZoneNames.json')
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
      noEvents: 'Sin eventos',
      emptyContainer: 'No hay eventos programados para hoy.',
      allDay: 'Todo el día',
      start: 'Inicio',
      end: 'Fin',
      more: 'Más',
      close: 'Cerrar',
      cancel: 'Cancelar',
      noTitle: '(Sin título)',
      delete: 'Borrar',
      deleteEvent: 'Borrar evento',
      deleteMultipleEvent: 'Borrar eventos',
      selectedItems: 'Items seleccionados',
      deleteSeries: 'Borrar series',
      edit: 'Editar',
      editSeries: 'Editar series',
      editEvent: 'Editar evento',
      createEvent: 'Crear',
      subject: 'Título',
      addTitle: 'Añadir título',
      moreDetails: 'Más Detalles',
      save: 'Guardar',
      editContent: '¿Quieres editar sólo este evento o la serie entera?',
      deleteRecurrenceContent:
        '¿Quieres borrar sólo este evento o toda la serie?',
      deleteContent: '¿Estás seguro de que quieres borrar este evento?',
      deleteMultipleContent:
        '¿Estás seguro de que quieres borrar los eventos seleccionados?',
      newEvent: 'Nuevo evento',
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
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService],
})
export class ReservarComponent implements OnInit {
  // Elementos del Scheduler
  @ViewChild('schedule', { static: true })  public scheduleObj: ScheduleComponent;
  @ViewChild('errorSwal', { static: true }) private errorSwal: SwalComponent;

  // Elementos del Datepicker y TimePicker
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date;

  // Elementos del Timepicker
  public date: number = new Date().getDate();
  public horaReserva: Date = new Date(
    this.fullYear,
    this.month,
    this.date,
    11,
    0,
    0
  );
  public minValue: Date = new Date(
    this.fullYear,
    this.month,
    this.date,
    11,
    0,
    0
  );
  public maxValue: Date = new Date(
    this.fullYear,
    this.month,
    this.date,
    23,
    0,
    0
  );
  public interval = 60;

  // Elementos del Calendario
  public data: object[] = [ ];
  public eventSettings: EventSettingsModel;
  public timeScaleOptions: TimeScaleModel = { enable: true, slotCount: 1 };

  // Elementos del formulario
  public form: FormGroup;
  nombre_completo: String;
  email: String;
  fechaReserva: any;
  estilistaSeleccionado: number;

  // Variables temporales
  categorias: any[] = [];
  servicios: any[] = [];
  estilistas: any[] = [];

  reservas: DTOReserva[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private servicioServicios: ServiciosService,
    private trabajadoresService: TrabajadoresService,
    private reservasService: ReservasService,
    private router: Router
  ) {
    // Para mañana
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    this.minDate = tomorrow;
  }

  ngOnInit() {
    this.scheduleObj.locale = 'es';
    // Elementos del formulario
    this.nombre_completo = JSON.parse(localStorage.getItem('socialUser')).nombre;
    this.email = JSON.parse(localStorage.getItem('socialUser')).email;

    this.form = this.formBuilder.group({
      nombre_completo: [{ value: this.nombre_completo, disabled: true }, [Validators.email]],
      email: [{ value: this.email, disabled: true }, [Validators.required]],
      telefono: ['', [Validators.required]],
      categoriaServicio: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
    });


    this.cargarCategoriasServicios();
  }

  // Saber si hay fecha seleccionada
  hayFechaSeleccionada() {
    return this.fechaReserva;
  }

  // Método principal de la acción de Reservar
  reservar() {
    const datos = Object.assign(this.form.value, {
      usuario: JSON.parse(localStorage.getItem('socialUser')).id,
      trabajador: this.estilistaSeleccionado,
      fecha: this.fechaReserva,
      hora: this.horaReserva.getTime(),
    });

    // Antes de enviar al server para el registro de la reserva, verifico que no coincide con las ya realizadas

     const puedeReservar = this.reservas.filter((reserva: DTOReserva) => {
       const fechaReservada = this.formatearFecha(new Date(reserva.fecha));
       const fechaSolicitda = this.formatearFecha(new Date(this.fechaReserva));
       const horaReservada = this.formatearHora(new Date(reserva.hora));
       const horaSolicitada = this.formatearHora(new Date(this.horaReserva));
      return fechaReservada === fechaSolicitda && horaReservada === horaSolicitada;
     }).length === 0;
     if (puedeReservar) {
      this.reservasService.addReserva(datos).subscribe(datos => {
        const reservada = datos['items'];
         swal({
          title: '<strong>Su reserva ha sido agendada</strong>',
          type: 'info',
          html:
            '<b>Referencia: </b> ' + reservada.codigo + '<br>' +
            '<b>Nombre: </b> ' + this.form.get('nombre_completo').value + '<br>' +
            '<b>Fecha: </b> ' + this.formatearFecha(new Date(reservada.fecha)) + '<br>' +
            '<b>Hora: </b> ' + this.formatearHora(new Date(reservada.hora)) + '<br>' +
            '<b>Estilista: </b> ' + this.getNombreEstilista(this.estilistaSeleccionado) + '<br>',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Gracias por visitarnos!',
          confirmButtonAriaLabel: 'Thumbs up, great!'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/']);
          }
        });
      });
     } else {
      this.errorSwal.show();
     }

  }

  // Cargar las categorias con sus servicios
  cargarCategoriasServicios() {
    this.servicioServicios.getCategoriasServicios().subscribe((datos) => {
      this.categorias = datos['items'];
    });
  }

  // Cargar los estilistas al seleccionar un servicio determinado
  seleccionarServicio(idServicio: number) {
    this.servicioServicios.showServicio(idServicio).subscribe((datos) => {
      this.estilistas = datos['items'].trabajadores;
      console.log( this.estilistas[0].usuario.img);
    });
  }

  seleccionarCategoria(idCategoria: number) {
    const categoria = this.categorias.find((element) => {
      return element['id'] === Number.parseInt(idCategoria.toString());
    });
    this.servicios = categoria.servicios.filter(
      (servicio) => servicio.activo === true
    );
  }

  seleccionarEstilista(idEstilista: number) {
    // Limpio el calendrio por si el usuario retrocede
    this.data = [];
    this.scheduleObj.refresh();
    this.estilistaSeleccionado = idEstilista;
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
            EndTime: new Date(anno, mes, dia, horaFin, 0)
          });
        });
        // Se la asigno al calendario
        this.eventSettings =  {
          dataSource: this.data,
        };
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


getNombreEstilista(id: number) {
  const estilista = this.estilistas.find(estilista => estilista.id === id);
  return estilista['nombre_completo'];
}

}
