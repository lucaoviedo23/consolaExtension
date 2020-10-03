import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ObraSocial } from '../services/equivalencia_models';
import { Observable } from 'rxjs';
import { EquivalenciaService } from '../services/equivalenciaservices.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFileService } from 'src/app/Utils/upload-file/upload-file.service';
import { BajaMasivaService } from './services/bajaMasiva.service';
import { ApptitleService } from 'src/app/layout/services/apptitle.service';

@Component({
  selector: 'app-bajamasiva',
  templateUrl: './bajamasiva.component.html',
  styleUrls: ['./bajamasiva.component.css']
})



export class BajamasivaComponent implements OnInit {
  prestadoresObraSocial = null;
  filter = {
    obra_social: ''
  };
  myFileKey = null;
  respuestaBajaEquivalencias: any;
  flagCantidadErrores: any = null;
  typeaheadObraSocial = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.prestadoresObraSocial.filter(v => v.obra_social_desc.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  osformatter = (os: ObraSocial) => os.obra_social_desc;


  constructor(private apptitleService: ApptitleService, private bajaMasivaService: BajaMasivaService, private uploadFileService: UploadFileService, private equivalenciaServicio: EquivalenciaService, private toastr: ToastrManager, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
    apptitleService.setTitle("Equivalencias");
  }



  ngOnInit() {
    this.traerPrestadoresObraSocial();
    this.onFileUploaded();
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
        
      });
  }

  onFileUploaded() {
    this.flagCantidadErrores = null;
  }

  checkAceptarBajaMasiva(): boolean {
    let checkIsOk = true;
    this.myFileKey = this.uploadFileService.paramRespuesta;
    if (this.filter.obra_social == null) {
      checkIsOk = false;
      this.toastr.errorToastr("Obra social es requerida", "Error");
    }
    if (this.myFileKey == null) {
      checkIsOk = false;
      this.toastr.errorToastr("Debe seleccionar un archivo", "Error");
    }
    return checkIsOk;
  }

  abrirModalConfirmarBajaMasiva(modalConfirmarBajaMasiva) {
    if (this.checkAceptarBajaMasiva()) {
      this.modalService.open(modalConfirmarBajaMasiva);
    }
    
  }

  aceptarBajaMasivaEquivalencias(modalConfirmarBajaMasiva, modalBajasErroneas) {
    
    this.bajaMasivaService.darBajaMasivaEquivalenciasOSDE(this.myFileKey)
      .subscribe(response => {
        this.respuestaBajaEquivalencias = response;
        this.flagCantidadErrores = response.cantidadErrores;
        if (this.respuestaBajaEquivalencias.cantidadErrores > 0) {
          
          this.modalService.open(modalBajasErroneas);
        }
      });
      this.modalService.dismissAll(modalConfirmarBajaMasiva);
      
  }

  obtenerPlantillaBajaMasiva() {
    this.bajaMasivaService.getTemplateNameBajaMasiva()
      .subscribe(response => {
        let fileName = response.xlsFilePath;
        this.bajaMasivaService.getExcelBajaMasiva(fileName)
          .subscribe(response => {

          });
      });
  };

  verUltimosErrores(modalBajasErroneas) {
    this.modalService.open(modalBajasErroneas);
  }

  cancelarEliminarEquivalencia(modalConfirmarBajaMasiva) {
    this.modalService.dismissAll(modalConfirmarBajaMasiva);
  }

  cerrarModalBajasErroneas(modal) {
    this.modalService.dismissAll(modal);

  }


  
  


}
