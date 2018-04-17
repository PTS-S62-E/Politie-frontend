import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable()
export class LoginService {

  public JWT_ADMINISTRATION = 'JWT_ADMINISTRATION';

  constructor(private httpClient: HttpClient, private configServie: ConfigService) {
  }

  public async attemptLogin(email: string, password: string) {
    const token = 'ExampleToken' as string;
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem(this.JWT_ADMINISTRATION, token);
    return token;
  }

  public getLoginToken(): string | null {
    return localStorage.getItem(this.JWT_ADMINISTRATION);
  }
}
