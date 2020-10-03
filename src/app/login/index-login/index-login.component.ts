import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserPasswordRequest } from '../services/auth_models';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { PassportHubService } from '../services/passportHub.service';
import { ParseSourceSpan } from '@angular/compiler';

@Component({
  selector: 'app-index-login',
  templateUrl: './index-login.component.html',
  styleUrls: ['./index-login.component.css']
})
export class IndexLoginComponent implements OnInit {

  params: UserPasswordRequest;
  passportHash: string;
  public errorMessage: string = '';

  constructor(private authService: AuthService, public toastr: ToastrManager, public router: Router, private route: ActivatedRoute, passportHubService: PassportHubService)
  {
    this.passportHash = this.route.snapshot.paramMap.get('passportHash');
    if (this.passportHash) {
      passportHubService.validatePassportHash(this.passportHash)
        .subscribe(response => {
          if (response.esValido) {
            // conseguir token
            let passportB = response.identityPassportHash;
            authService.loginWithPassport(passportB)
              .subscribe(result => {
                localStorage.setItem('access_token_extension', result.access_token);
                localStorage.setItem('refresh_token_extension', result.refresh_token);
                passportHubService.setLastPassportParams(response.lastPassportParams);
                console.log("redireccionando a " + response.goToUrl);
                this.router.navigate(['/' + response.goToUrl]);
              },
              (error) => {
                this.toastr.errorToastr('Verifique su passport.', 'Login inválido');
                error.errorManejado = true;                
              });           
          }
        },
        (error) => {
          this.toastr.errorToastr('Verifique su passport.', 'Login inválido');
          error.errorManejado = true;
        });
    }
      
  }


  ngOnInit() {
    this.params = new UserPasswordRequest();
    this.params.username = '';
    this.params.password = '';
    this.params.grant_type = 'password';
    this.params.client_id = 'ec';

  }




  //Token
  ingresarLogin() {
    if (this.params.username && this.params.password) {
      this.authService.obtenerToken(this.params)
        .subscribe(result => {
          localStorage.setItem('access_token_extension', result.access_token);
          localStorage.setItem('refresh_token_extension', result.refresh_token);
          this.router.navigate(['/buscarequivalencias']);
          //this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
        },
        (error) => {
          this.toastr.errorToastr('Verifique su usuario o contraseña.', 'Login inválido');
          error.errorManejado = true;
          console.log("manejado:", error);
        });
    }
    else {
      this.toastr.errorToastr('Todos los campos son requeridos.', 'Error!');
    }


  }



}
