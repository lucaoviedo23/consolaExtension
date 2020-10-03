import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquivalenciaService } from '../services/equivalenciaservices.service';
import { prestacionOsdeEquivalenciaByIdRequest, Equivalencia } from '../services/equivalencia_models';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';
import { ApptitleService } from 'src/app/layout/services/apptitle.service';
import { UtilsService } from 'src/app/Utils/utils.service';


@Component({
  selector: 'app-editarequivalencia',
  templateUrl: './editarequivalencia.component.html',
  styleUrls: ['./editarequivalencia.component.css']
})
export class EditarequivalenciaComponent implements OnInit {

  equivalencia: Equivalencia;
  estaOculto = false;

  private ngCodigoPrestacionOsde = '';
  private ngCodigoPrestacionPrestador = '';

  params = {
    filialPrestador: '',
    codigoPrestador: '',
    codigoPrestacionOsde: '',
    codigoPrestacionPrestador:''
  };

  constructor(private route: ActivatedRoute, private equivalenciaServicio: EquivalenciaService, private toastr: ToastrManager, private router: Router, private _location: Location, private apptitleService: ApptitleService, private utils: UtilsService)
  {
    apptitleService.setTitle("Equivalencias");   
  }
  
  ngOnInit() {

    this.buscarEquivalenciaById();
    this.flagAgregarEquivalencia();
  }





  //Editar equivalencia
  toastrEditarEquivalenciaCorrecto() {
    this.toastr.successToastr('Equivalencia editada correctamente.', 'Success!');
  }


  buscarEquivalenciaById(): void {
    let _codigoPrestador: string = this.route.snapshot.paramMap.get('codigoPrestador');
    let _codigoPrestacionPrestador: string = this.route.snapshot.paramMap.get('codigoPrestacionPrestador');
    let _filialPrestador: string = this.route.snapshot.paramMap.get('filialPrestador');

    let equivalenciaByIdRequest = new prestacionOsdeEquivalenciaByIdRequest();
    equivalenciaByIdRequest.codigoPrestacionPrestador = _codigoPrestacionPrestador;
    equivalenciaByIdRequest.codigoPrestador = _codigoPrestador;
    equivalenciaByIdRequest.filialPrestador = _filialPrestador;


    this.equivalenciaServicio.buscarEquivalenciaById(equivalenciaByIdRequest)
      .subscribe(result => {
        this.equivalencia = result.item;
      });
  }


  guardarEdicionEquivalencia() {
    if (this.equivalencia.codigoPrestacionOsde) {
      this.equivalencia.codigoPrestacionOsde = this.utils.padLeftWith6Zero(this.equivalencia.codigoPrestacionOsde);
      this.equivalenciaServicio.editarEquivalenciaOSDE(this.equivalencia).subscribe(result => {
        this.toastrEditarEquivalenciaCorrecto();
        this.volverAtrasURL();
      });
    }
    else {
      this.toastr.errorToastr("Todos los campos son obligatorios.",'Error!');
    }
  }



  //Agregar Equivalencia


  flagAgregarEquivalencia() {
    if (!this.route.snapshot.paramMap.get('codigoPrestacionPrestador')) {
      this.estaOculto = true;
      let _codigoPrestador: string = this.route.snapshot.paramMap.get('codigoPrestador');
      let _filialPrestador: string = this.route.snapshot.paramMap.get('filialPrestador');
      this.params.codigoPrestador = _codigoPrestador;
      this.params.filialPrestador = _filialPrestador;
      }
    }


  guardarAgregarEquivalencia() {
    if (this.params.codigoPrestacionPrestador && this.params.codigoPrestacionOsde) {
      this.params.codigoPrestacionOsde = this.utils.padLeftWith6Zero(this.params.codigoPrestacionOsde);
      this.params.codigoPrestacionPrestador = this.utils.padLeftWith6Zero(this.params.codigoPrestacionPrestador);
      this.equivalenciaServicio.insertarEquivalenciaOSDE(this.params).subscribe(result => {
        this.toastr.successToastr('Equivalencia agregada correctamente.', 'Success!');
        this.volverAtrasURL();
      });
    }
    else {
      this.toastr.errorToastr('Todos los campos son requeridos.','Error!');
    }
    
  }



  volverAtrasURL() {
    let _codigoPrestador: string = this.route.snapshot.paramMap.get('codigoPrestador');
    let _filialPrestador: string = this.route.snapshot.paramMap.get('filialPrestador');
    this.router.navigate(['buscarequivalencias', _codigoPrestador, _filialPrestador]);  
  }



  checkFocus() {
    if (this.params.codigoPrestacionOsde || this.params.codigoPrestacionPrestador) {
      this.params.codigoPrestacionOsde = this.utils.padLeftWith6Zero(this.params.codigoPrestacionOsde);
      this.params.codigoPrestacionPrestador = this.utils.padLeftWith6Zero(this.params.codigoPrestacionPrestador);
    }
    if (this.equivalencia.codigoPrestacionOsde) {
      this.equivalencia.codigoPrestacionOsde = this.utils.padLeftWith6Zero(this.equivalencia.codigoPrestacionOsde);
    }
  }


  }






