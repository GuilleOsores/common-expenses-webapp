import { Injectable } from '@angular/core';
//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor (private authService: AuthService) {

    }

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });            
            console.dir(request.headers)
        }

        return next.handle(request);
    }

}