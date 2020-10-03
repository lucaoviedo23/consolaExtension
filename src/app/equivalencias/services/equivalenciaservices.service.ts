import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrestadorObraSocialResponse, traerEquivalenciasOsdeResponse, filterEquivalenciaRequest, codigoPrestacionOsdeEquivalenciaByIdResponse, prestacionOsdeEquivalenciaByIdRequest, Equivalencia, EquivalenciaInsertRequest, EquivalenciaEliminarRequest, EquivalenciaEditarRequest } from './equivalencia_models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquivCodPrestacion } from 'src/app/Models/EquivCodPrestacion';
import { traerEquivalenciaByEquivCodPrestacionIdResponse } from 'src/app/Response/traerEquivalenciaByEquivCodPrestacionId';
import { traerEquivalenciaByEquivCodPrestacionIdRequest } from 'src/app/Request/EquivCodPrestacionRequest';


@Injectable({
  providedIn: 'root'
})
export class EquivalenciaService {

   

  constructor(private http: HttpClient) { }


  
  traerPrestadoresObraSocial() {
    return this.http.get<PrestadorObraSocialResponse>(environment.apiServiceBaseUri + '/api/equivalenciasOsde/traerPrestadoresObraSocial');
  }




  traerEquivalenciasOsde(filterRequest: filterEquivalenciaRequest): Observable<traerEquivalenciasOsdeResponse> {
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/traerEquivalenciasOsde';
    return this.http.post<traerEquivalenciasOsdeResponse>(url, filterRequest);
  }



  buscarEquivalenciaById(equivalenciaByIdRequest: prestacionOsdeEquivalenciaByIdRequest): Observable<codigoPrestacionOsdeEquivalenciaByIdResponse> {
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/traerEquivalenciaOsdeById';
    return this.http.post<codigoPrestacionOsdeEquivalenciaByIdResponse>(url, equivalenciaByIdRequest);
  }

  insertarEquivalenciaOSDE(insertarEquivalencia: Equivalencia): Observable<any> {
    let request = new EquivalenciaInsertRequest();
    request.item = insertarEquivalencia;
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/insertarEquivalenciaOSDE';
    return this.http.post(url, request);
  }


  editarEquivalenciaOSDE(editarEquivalencia: Equivalencia): Observable<any> {
    let request = new EquivalenciaEditarRequest();
    request.item = editarEquivalencia;
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/editarEquivalenciaById';
    return this.http.post(url, request);
  }

  eliminarEquivalenciaOSDE(eliminarEquivalencia: Equivalencia): Observable<any> {
    let request = new EquivalenciaEliminarRequest();
    request.item = eliminarEquivalencia;
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/eliminarEquivalenciaOSDE';
    return this.http.post(url, request);
  }


  traerEquivalenciaByEquivCodPrestacionId(equivCodRequest: traerEquivalenciaByEquivCodPrestacionIdRequest): Observable<traerEquivalenciaByEquivCodPrestacionIdResponse> {
    const url = environment.apiServiceBaseUri + '/api/equivalenciasOsde/traerEquivalenciaOsdeByequivCodPrestacionId';
    return this.http.post<traerEquivalenciaByEquivCodPrestacionIdResponse>(url,equivCodRequest);
  }

}
