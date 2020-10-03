import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public toastr: ToastrManager, public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //localStorage.setItem('ngStorage-access_token', 'Ti7biGuIx6qDpt3uv2zfDwl6pMn-JtDJa0GGbtdEIFw109Xij6VpxCMyWLC6B_d40GGocpwQ4mVhcv7SZHY0YKHlEVivL69pTr7qBS0w2am9g5e86GeyL9c0McNIsRfB_C7eOsCMSTAlmDPWS9E-JP_gz3I4aRBqOaOSw8j7SyTT7VuFR1Szqq1mjmp6ZTJFFx4pT9ZtemOl0UduKpndA_DbxJzPkYKuiTpF55zdMNINSWYz7KVh1tpNao8QUuFn6nScvw');
    const token: string = localStorage.getItem('access_token_extension');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    } else if (request.headers.get('Content-Type') == "none") {
      request = request.clone({ headers: request.headers.delete('Content-Type') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('eventoo--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("logggggg", error);
        if (error.status === 401 || error.status === 403) {
          //handle authorization errors
          //in this example I am navigating to login.
          this.router.navigate(['login']);
        }
        
        try {
          let data1 = {
            reason: error && error.error.reason ? error.error.reason : (error.error.innerException.exceptionMessage ? error.error.innerException.exceptionMessage : ''),
            status: error.status
          };
          this.toastr.errorToastr(data1.status + ' ' + data1.reason, 'Service error');
          return throwError(error);
        }

        catch {
          let data = {
            reason: error && error.error.reason ? error.error.reason : (error.error.exceptionMessage ? error.error.exceptionMessage : ''),
            status: error.status
          };
          this.toastr.errorToastr(data.status + ' ' + data.reason, 'Service error');
          return throwError(error);
        }
        
      }));
  }
}



