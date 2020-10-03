
import { Component, OnInit } from '@angular/core';
import { BuscarequivalenciasComponent } from '../buscarequivalencias/buscarequivalencias.component';
import { traerInforUsuarioResponse } from 'src/app/layout/services/user_models';
import { UserService } from 'src/app/layout/services/user.service';
import { ApptitleService } from 'src/app/layout/services/apptitle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarequivalencias',
  templateUrl: './navbarequivalencias.component.html',
  styleUrls: ['./navbarequivalencias.component.css']
})
export class NavbarequivalenciasComponent implements OnInit {
  buscarEquivalencias: BuscarequivalenciasComponent;
  navbarOpen = false;
  usuarioInfo: traerInforUsuarioResponse;

  constructor(private userServicio: UserService, private apptitleService: ApptitleService, private router: Router) { }

  ngOnInit() {
    this.traerInfoUsuarioFunction();
  }


  


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }



  //      api/user
  traerInfoUsuarioFunction(): void {

    this.userServicio.traerInfoUsuario()
      .subscribe(response => {
        this.usuarioInfo = response;
      }); 
  }

  cerrarSesion(): void {
    localStorage.clear();
    location.href = '/login';
  }

  volverAlIndice(): void {
    location.href = '/';
  }

  volverAImportar(): void {
    location.href = '/updmasivos/#/subirexcel/5';
  }


  irABajaMasiva(): void {
    this.router.navigate(['/bajamasiva']);
  }

  irABuscar(): void {
    this.router.navigate(['/buscarequivalencias']);
  }

}
