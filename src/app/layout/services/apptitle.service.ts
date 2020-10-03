import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApptitleService {
  private titleSource = new Subject<string>();
  title$ = this.titleSource.asObservable();

  constructor() { }

  setTitle(nuevoTitulo: string) {
    this.titleSource.next(nuevoTitulo);
  }
}
