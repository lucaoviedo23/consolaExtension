import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isUndefined } from 'util';
import { UploadFileService } from './upload-file.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  //@ViewChild('fileInput') fileInput;
  respuesta: string = null;
  paso: number = null;
  respuestaDeSubidaExcel: any;
  @Output() onUploaded = new EventEmitter();
  constructor(private http: HttpClient, private uploadService: UploadFileService, private modalService: NgbModal, private toastr: ToastrManager) { }
  

  ngOnInit() {
  }

  uploadFile(modalUploadFile) {
    let fileInput: HTMLInputElement = <HTMLInputElement>document.getElementById("fileInput");
    let headers = new HttpHeaders({ 'Content-Type': 'none' });
    let httpOptions = { headers: headers };
    const payLoad = new FormData();
    var f = fileInput.files[0];
    payLoad.append('file', f);
    if (this.checkUpLoadFile()) {
      this.uploadService.UpLoadFile(payLoad, httpOptions)
        .subscribe(result => {
          if (result) {
            this.modalService.dismissAll(modalUploadFile);
            this.paso = 1;
            this.respuesta = "1 archivo subido";
            this.respuestaDeSubidaExcel = result.files[0].key;
            this.uploadService.respuestaExcel(this.respuestaDeSubidaExcel);
            this.onUploaded.next(this.respuestaDeSubidaExcel);
          }
        });
    }
  };


  checkUpLoadFile(): boolean{
    let uploadIsOk = true;
    let fileInput: HTMLInputElement = <HTMLInputElement>document.getElementById("fileInput");
    if (fileInput.files[0] == null) {
      uploadIsOk = false;
      this.toastr.errorToastr("Debe seleccionar un archivo", "Error");
    }
    return uploadIsOk;
  }

  abrirModal(modalEquivalencia) {
    this.modalService.open(modalEquivalencia);
  };
  cerrarModal(modalEquivalencia) {
    this.modalService.dismissAll(modalEquivalencia);
  };

  
}
