import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { BuscarequivalenciasComponent } from './buscarequivalencias/buscarequivalencias.component';
import { EditarequivalenciaComponent } from './editarequivalencia/editarequivalencia.component';
import { BajamasivaComponent } from './bajamasiva/bajamasiva.component';

const routes: Routes = [
  {
    path: 'buscarequivalencias',
    component: HeaderComponent,
    children: [
      { path: '', component: BuscarequivalenciasComponent },
      { path: ':equivCodPrestacionId', component: BuscarequivalenciasComponent },
      { path: ':codigoPrestador/:filialPrestador', component: BuscarequivalenciasComponent }
      

    ]
  },
  {
    path: 'editarequivalencia',
    component: HeaderComponent,
    children: [
      { path: ':codigoPrestador/:filialPrestador/nuevo', component: EditarequivalenciaComponent },
      { path: ':codigoPrestador/:codigoPrestacionPrestador/:filialPrestador', component: EditarequivalenciaComponent }
    ]
  },
  {
    path: 'bajamasiva',
    component: HeaderComponent,
    children: [
      { path: '', component: BajamasivaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquivalenciasRoutingModule { }
