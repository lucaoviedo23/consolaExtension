import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { traerInforUsuarioResponse } from './user_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  traerInfoUsuario() {
    return this.http.get<traerInforUsuarioResponse>(environment.apiServiceBaseUri + '/api/user');
  }
}
