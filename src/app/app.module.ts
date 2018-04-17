import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OwnerHistoryComponent} from './owner-history/owner-history/owner-history.component';
import {NavbarComponent} from './general/navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './general/homepage/homepage.component';
import {VehicleSelectorComponent} from './owner-history/vehicle-selector/vehicle-selector.component';
import {VehicleService} from './services/vehicle.service';
import {VehicleViewComponent} from './owner-history/vehicle-view/vehicle-view.component';
import {FormsModule} from '@angular/forms';
import {JWTInterceptor} from './classes/JWTInterceptor';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import {ConfigService} from './services/config.service';

const appRoutes: Routes = [
  {path: 'owner-history', component: OwnerHistoryComponent},
  // {path: 'login', component: LoginComponent},
  {path: '', component: HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OwnerHistoryComponent,
    NavbarComponent,
    HomepageComponent,
    VehicleSelectorComponent,
    VehicleViewComponent,
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [
    HttpClient,
    VehicleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    LoginService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
