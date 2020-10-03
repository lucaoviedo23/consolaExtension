import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { obtenerTokenResponse, UserPasswordRequest } from './auth_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PassportHubService {
  LastPassportParams: string;

  constructor(private http: HttpClient) { }

  validatePassportHash(passportHash: string): Observable<ValidarPassportHashResponse> {
    this.LastPassportParams = null;
    let params = { passportHash: passportHash };
    return this.http.post<ValidarPassportHashResponse>(environment.apiServiceBaseUri + 'api/passporthub/validatepassporthash', params);    
  }

  setLastPassportParams(nuevoPassportParams: string) {
    this.LastPassportParams = nuevoPassportParams;
  }

  clearLastPassportParams(): void {
    this.LastPassportParams = null;
  }

  /*
  obtenerToken(varToken: UserPasswordRequest): Observable<obtenerTokenResponse> {
    const url = environment.apiAuthServiceBaseUri + '/token';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body.set('username', varToken.username)
    body.set('password', varToken.password);
    body.set('grant_type', varToken.grant_type);
    body.set('client_id', varToken.client_id);

    let bodyString = "username=" + varToken.username + "&password=" + varToken.password + "&grant_type=" + varToken.grant_type + "&client_id=" + varToken.client_id;
    return this.http.post<obtenerTokenResponse>(url, bodyString, { headers: headers });
  }

*/



}

export class ValidarPassportHashResponse {
  goToUrl: string;
  esValido: boolean;
  identityPassportHash: string;
  lastPassportParams: string;
}
