import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { WOW } from 'wowjs/dist/wow.min';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { PublicacionesService } from '../../shared/services/publicaciones.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];

  categorias: any;

  totalPublicaciones: number;
  totalGalerias: number;
  totalEventos: number;
  totalMedias: number;
  totalTrabajadores: number;
  totalServicios: number;
  totalProductos: number;
  totalReservas: number;


  // Gráficos
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 10,
            max: 100
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 10
          }
        }
      ]
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: string;
  public barChartLegend: boolean;
  // CHART COLOR.
  public barChartColors = [
    {
      // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ];

  public barChartData: Array<any> = [
    {
      data: [],
      label: 'Cantidades por categoría'
    }
  ];

  constructor(
    private servicioChart: ChartsService,
    private router: Router
  ) {
    this.sliders.push(
      {
        imagePath: 'assets/images/slider3.jpg',
        label: '¿Qué es el SCI?',
        text: 'Sistema de Control Integral.'
      },
      {
        imagePath: 'assets/images/slider2.jpg',
        label: '¿Qué objetivos tiene?',
        text: 'Gestionar la gestión integral del negocio.'
      },
      {
        imagePath: 'assets/images/slider3.jpg',
        label: '¿A quién está dirigido?',
        text: 'Al personal administrativo de DondeDorian'
      }
    );
  }

  ngOnInit() {
    // WOW
    new WOW().init();

    // Charts
    this.barChartType = 'bar';
    this.barChartLegend = true;

    this.servicioChart.getResumen().subscribe(data => {
      if (data['items']) {
        const {tPublicaciones, tGalerias, tEventos, tMedias, tTrabajadores, tServicios, tProductos, tReservas} = data['items'];
        this.totalPublicaciones = tPublicaciones;
        this.totalGalerias = tGalerias;
        this.totalEventos = tEventos;
        this.totalMedias = tMedias;
        this.totalTrabajadores = tTrabajadores;
        this.totalServicios = tServicios;
        this.totalProductos = tProductos;
        this.totalReservas = tReservas;
      }
    });

  }


}
