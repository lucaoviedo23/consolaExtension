import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquivalenciasRoutingModule } from './equivalencias-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarequivalenciasComponent } from './navbarequivalencias/navbarequivalencias.component';
import { BuscarequivalenciasComponent } from './buscarequivalencias/buscarequivalencias.component';
import { EditarequivalenciaComponent } from './editarequivalencia/editarequivalencia.component';
import { BajamasivaComponent } from './bajamasiva/bajamasiva.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    EquivalenciasRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class EquivalenciasModule { }
