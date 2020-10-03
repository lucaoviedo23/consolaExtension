import { Component, OnInit} from '@angular/core';
import { ApptitleService } from '../services/apptitle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
    ngOnInit(): void {
      
    }

  subscription: Subscription;
  titulo: string;

  constructor(private apptitleService: ApptitleService)
  { 
    this.subscription = this.apptitleService.title$.subscribe(
      nuevoTitulo => {
        this.titulo = nuevoTitulo;        
      });
  }
  

} 
