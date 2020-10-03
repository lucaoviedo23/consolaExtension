import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { EquivalenciaService } from '../services/equivalenciaservices.service';
import { ObraSocial, Equivalencia } from '../services/equivalencia_models';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApptitleService } from 'src/app/layout/services/apptitle.service';
import { PassportHubService } from 'src/app/login/services/passportHub.service';
import { UtilsService } from 'src/app/Utils/utils.service';
import { EquivCodPrestacion } from 'src/app/Models/EquivCodPrestacion';
import { traerEquivalenciaByEquivCodPrestacionIdRequest } from 'src/app/Request/EquivCodPrestacionRequest';
import { prestador_instalacion_os } from 'src/app/Models/Prestador_instalacion_os';

@Component({
  selector: 'app-buscarequivalencias',
  templateUrl: './buscarequivalencias.component.html',
  styleUrls: ['./buscarequivalencias.component.css']
})

export class BuscarequivalenciasComponent implements OnInit {
  prestadoresObraSocial = null;
  equivalencias: Equivalencia[];
  equivalenciaSeleccionada: Equivalencia;
  estaOculto = true;
  ngCodigoPrestacionPrestador = '';
  ngCodigoPrestacionOSDE = '';
  convertido = null;
  equivCodPrestacionId = null;
  itemFilter = null;
  focusVar = null;
  prestador_instalacion_os: prestador_instalacion_os;

  filter = {
    codigoPrestador: '',
    filialPrestador: '',
    obra_social: ''
  };

  typeaheadObraSocial = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.prestadoresObraSocial.filter(v => v.obra_social_desc.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  osformatter = (os: ObraSocial) => os.obra_social_desc;

  constructor(private equivalenciaServicio: EquivalenciaService, private toastr: ToastrManager, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private apptitleService: ApptitleService, private passportHubService: PassportHubService, private utils: UtilsService) {
    apptitleService.setTitle("Equivalencias");
  }

  ngOnInit() {
    this.utils.backButtonEventBrowser();
    this.traerPrestadoresObraSocial();
    this.flagBuscarEquivalenciaByEquivCodPrestacionId();

    if (this.passportHubService.LastPassportParams) {
      let passportParms: any = JSON.parse(this.passportHubService.LastPassportParams);
      this.passportHubService.clearLastPassportParams();
      let _codigoPrestador: string = passportParms.nroPrestador;
      let _filialPrestador: string = passportParms.filialPrestador;
      this.router.navigate(['buscarequivalencias', _codigoPrestador, _filialPrestador]);
    }
    
  }

  traerPrestadoresObraSocial(): void {

    this.equivalenciaServicio.traerPrestadoresObraSocial()
      .subscribe(response => {
        this.prestadoresObraSocial = response.items;
        for (var i = 0; i < this.prestadoresObraSocial.length; i++) {
          let unaObraSocial = this.prestadoresObraSocial[i];
          if (unaObraSocial.obra_social_codigo === "OSDE  ") {
            this.filter.obra_social = unaObraSocial;
          }
        }

        this.buscarEquivalenciaFromEditar();
      });
  }
  buscar(): void {
    if (this.filter.codigoPrestador && this.filter.filialPrestador && this.filter.obra_social) {
      


      this.equivalenciaServicio.traerEquivalenciasOsde(this.filter)
        .subscribe(result => {
          this.equivalencias = result.items;
          this.prestador_instalacion_os = result.item;
          this.estaOculto = false;
          this.router.navigate(['buscarequivalencias', this.filter.codigoPrestador, this.filter.filialPrestador]);

        });
    }
    else {
      this.toastr.errorToastr('Todos los campos son obligatorios.', 'Error!');
    }
  }

  abrirModal(modalEquivalencia, unaEquivalencia) {
    this.modalService.open(modalEquivalencia);
    this.equivalenciaSeleccionada = unaEquivalencia;
  }

  cancelarModal(modalEquivalencia) {
    this.modalService.dismissAll(modalEquivalencia);
  }

  eliminarEquivalencia(modalEquivalencia, confirmarEliminarModal) {
    this.modalService.dismissAll(modalEquivalencia);
    this.modalService.open(confirmarEliminarModal);
  }

  aceptarEliminarEquivalencia(confirmarEliminarModal) {

    this.equivalenciaSeleccionada.filialPrestador = this.filter.filialPrestador;
    this.equivalenciaSeleccionada.codigoPrestador = this.filter.codigoPrestador;
    this.equivalenciaServicio.eliminarEquivalenciaOSDE(this.equivalenciaSeleccionada)
      .subscribe(response => {
        this.toastr.successToastr('Equivalencia eliminada correctamente', 'Success!');
        this.modalService.dismissAll(confirmarEliminarModal);
        let codigoPrestacionOsdeAEliminar = this.equivalenciaSeleccionada.codigoPrestacionOsde;
          for (let x = 0; x < this.equivalencias.length; x++)
            if (this.equivalencias[x].codigoPrestacionOsde == codigoPrestacionOsdeAEliminar) {
              this.equivalencias.splice(x, 1);
            }
        
        
      });

  }

  cancelarEliminarEquivalencia(confirmarEliminarModal, modalEquivalencia) {
    this.modalService.dismissAll(confirmarEliminarModal);
    this.modalService.open(modalEquivalencia);
  }

  btnCerrarListadoEquivalencias() {
    this.router.navigate['/buscarequivalencias']
    this.estaOculto = true;
  }

  buscarEquivalenciaFromEditar(): void {

    if (!this.route.snapshot.paramMap.get('codigoPrestador')) {
      this.btnCerrarListadoEquivalencias();
    }
    else {
      let _codigoPrestador: string = this.route.snapshot.paramMap.get('codigoPrestador');
      let _filialPrestador: string = this.route.snapshot.paramMap.get('filialPrestador');
      this.filter.codigoPrestador = _codigoPrestador;
      this.filter.filialPrestador = _filialPrestador;
      this.buscar();
    }
  }

  flagBuscarEquivalenciaByEquivCodPrestacionId(): void {
    if (this.route.snapshot.paramMap.get('equivCodPrestacionId')) {
      let pEquivCodPrestacionId: string = this.route.snapshot.paramMap.get('equivCodPrestacionId');
      let request: traerEquivalenciaByEquivCodPrestacionIdRequest = new traerEquivalenciaByEquivCodPrestacionIdRequest();
      request.EquivCodPrestacionId = pEquivCodPrestacionId;
      this.equivalenciaServicio.traerEquivalenciaByEquivCodPrestacionId(request)
        .subscribe(response => {
          this.itemFilter = response.item;
          if (this.itemFilter != (null)) {
            this.filter.codigoPrestador = this.itemFilter.codigoPrestador;
            this.filter.filialPrestador = this.itemFilter.filialPrestador;
            this.equivalenciaServicio.traerEquivalenciasOsde(this.filter)
              .subscribe(result => {
                this.equivalencias = result.items;
                this.estaOculto = false;
              });
          }
          else if (this.itemFilter == (null)) {
            this.toastr.errorToastr('No existen equivalencias para ese ID.', 'Error!');
          }
        });
    }
  }

  checkFocus() {
    this.filter.codigoPrestador = this.utils.padLeftWith6Zero(this.filter.codigoPrestador);
    this.filter.filialPrestador = this.utils.padLeftWithFilial(this.filter.filialPrestador);
    }




}

