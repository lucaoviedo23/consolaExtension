import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BajaMasivaService {

  constructor(private http: HttpClient) { }

  darBajaMasivaEquivalenciasOSDE(fileKey: string): Observable<any> {
    let params = {
      FileKey: fileKey
    };
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/bajamasivaequivalencias';
    return this.http.post<string>(url, params);
  }

  getTemplateNameBajaMasiva(): Observable<any> {
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/gettemplatebajamasiva';
    return this.http.get<string>(url);

  }

  getExcelBajaMasiva(fileName): any {
    const url = environment.apiServiceBaseUri + '/api/descarga/getexcel?xlsPath=' + fileName;
    window.location.href = url
  }








  
}
