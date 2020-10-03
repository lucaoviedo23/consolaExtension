import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  paramRespuesta: any;
  constructor(private http: HttpClient) { }

  UpLoadFile(pPayLoad: any, pHttpOptions: any): Observable<any> {
    const url = environment.apiServiceBaseUri + '/api/uploadfile';
    return this.http.post<any>(url, pPayLoad, pHttpOptions);
  }


  respuestaExcel(respuesta: string): string {
    this.paramRespuesta = respuesta;
    return this.paramRespuesta;
  }
}
