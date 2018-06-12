import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StolenVehicleComponent } from './stolen-vehicle/stolen-vehicle/stolen-vehicle.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './general/homepage/homepage.component';
import { VehicleSelectorComponent } from './stolen-vehicle/vehicle-selector/vehicle-selector.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleViewComponent } from './stolen-vehicle/vehicle-view/vehicle-view.component';
import { FormsModule } from '@angular/forms';
import { JWTInterceptor } from './classes/JWTInterceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { ConfigService } from './services/config.service';
import { MapComponent } from './map/map/map.component';
import { VehicleinfoService } from './services/vehicleinfo.service';

import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { HistoryMapComponent } from './history-map/history-map.component';
import { TranslocationService } from './services/translocation.service';

const stompConfig = {
  url: 'ws://teunwillems.nl:15674/ws',
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};

const appRoutes: Routes = [
  { path: 'stolen-vehicle', component: StolenVehicleComponent },
  { path: 'stolen-vehicle/map', component: MapComponent },
  { path: 'stolen-vehicle/history-map', component: HistoryMapComponent },
  { path: '', component: HomepageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StolenVehicleComponent,
    NavbarComponent,
    HomepageComponent,
    VehicleSelectorComponent,
    VehicleViewComponent,
    MapComponent,
    HistoryMapComponent
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    TranslocationService,
    HttpClient,
    VehicleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    LoginService,
    ConfigService,
    StompService,
    {
      provide: StompConfig, useValue: stompConfig
    },
    VehicleinfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
