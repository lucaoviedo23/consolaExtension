import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { obtenerTokenResponse, UserPasswordRequest } from './auth_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }


  obtenerToken(varToken: UserPasswordRequest): Observable<obtenerTokenResponse> {
    const url = environment.apiAuthServiceBaseUri + '/token';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body.set('username', varToken.username)
    body.set('password', varToken.password);
    body.set('grant_type', varToken.grant_type);
    body.set('client_id', varToken.client_id);

    let bodyString = "username=" + varToken.username + "&password=" + varToken.password + "&grant_type=" + varToken.grant_type + "&client_id="+ varToken.client_id;
    return this.http.post<obtenerTokenResponse>(url, bodyString, { headers: headers});
  }

  loginWithPassport(varPassportHash: string): Observable<obtenerTokenResponse> {
    const url = environment.apiAuthServiceBaseUri + '/token';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body.set('passport', varPassportHash);
    body.set('grant_type', "activiapassport");
    body.set('client_id', "ec");

    let bodyString = "passport=" + varPassportHash + "&grant_type=activiapassport&client_id=ec";
    return this.http.post<obtenerTokenResponse>(url, bodyString, { headers: headers });
  }

  



}
