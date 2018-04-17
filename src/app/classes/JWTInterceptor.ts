import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../services/login.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.getLoginToken() != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginService.getLoginToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
