import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  locationBack: any;


  constructor(private router: Router) { }

  padLeftWith6Zero(param): string {
    if (param && param.length <= 6) {
      var arrayPrestador = Array.from(param);
      var countLength = 6 - param.length;
      for (var i = 1; i <= countLength; i++) {
        arrayPrestador.unshift('0');
      }
      var nroPrestador = arrayPrestador.join("");
      return nroPrestador;
    }
    else {
      return param;
    }
  }


  padLeftWithFilial(param): string {
    if (param && param.length <= 2) {
      var arrayPrestador = Array.from(param);
      var countLength = 2 - param.length;
      for (var i = 1; i <= countLength; i++) {
        arrayPrestador.unshift('0');
      }
      var nroPrestador = arrayPrestador.join("");
      return nroPrestador;
    }
    else {
      return param;
    }
  }

  backButtonEventBrowser() {
    if (this.router.url.indexOf('/login', 0) > 0) {
    location.href = '/default.html';
      }
   
  } 
}
