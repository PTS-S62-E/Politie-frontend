import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StolenVehicleComponent} from './stolen-vehicle/stolen-vehicle/stolen-vehicle.component';
import {NavbarComponent} from './general/navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './general/homepage/homepage.component';
import {VehicleSelectorComponent} from './stolen-vehicle/vehicle-selector/vehicle-selector.component';
import {VehicleService} from './services/vehicle.service';
import {VehicleViewComponent} from './stolen-vehicle/vehicle-view/vehicle-view.component';
import {AddStolenVehicleComponent} from './add-stolen-vehicle/add-stolen-vehicle/add-stolen-vehicle.component';
import {FormsModule} from '@angular/forms';
import {JWTInterceptor} from './classes/JWTInterceptor';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import {ConfigService} from './services/config.service';

const appRoutes: Routes = [
  {path: 'stolen-vehicle', component: StolenVehicleComponent},
  {path: 'add-stolen-vehicle', component: AddStolenVehicleComponent},
  // {path: 'login', component: LoginComponent},
  {path: '', component: HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StolenVehicleComponent,
    NavbarComponent,
    HomepageComponent,
    VehicleSelectorComponent,
    VehicleViewComponent,
    AddStolenVehicleComponent
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
