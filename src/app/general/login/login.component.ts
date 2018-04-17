import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = null;
  public password: string = null;

  public loginAttempt: boolean = null;
  public isLoggingIn = false;

  constructor(private loginService: LoginService, private routeService: Router) {
  }

  ngOnInit() {
  }

  async onLoginSubmitted() {
    this.isLoggingIn = true;
    const loginToken = await this.loginService.attemptLogin(this.email, this.password);
    this.loginAttempt = loginToken != null;
    if (this.loginAttempt) {
      await this.routeService.navigate(['/']);
    }
    this.isLoggingIn = false;
  }

}
