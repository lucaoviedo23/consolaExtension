  import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { EquivalenciasModule } from './equivalencias/equivalencias.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { ErrorDialogComponent } from './interceptor/errordialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { BuscarequivalenciasComponent } from './equivalencias/buscarequivalencias/buscarequivalencias.component';
import { EditarequivalenciaComponent } from './equivalencias/editarequivalencia/editarequivalencia.component';
import { NavbarequivalenciasComponent } from './equivalencias/navbarequivalencias/navbarequivalencias.component';
import { BajamasivaComponent } from './equivalencias/bajamasiva/bajamasiva.component';
import { UploadFileComponent } from './Utils/upload-file/upload-file.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/buscarequivalencias',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    BuscarequivalenciasComponent,
    EditarequivalenciaComponent,
    NavbarequivalenciasComponent,
    BajamasivaComponent,
    UploadFileComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    LoginModule,
    EquivalenciasModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    NgbModule,
    BlockUIModule.forRoot({
      delayStart: 0,
      delayStop: 100
    }),
    BlockUIHttpModule.forRoot()
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
