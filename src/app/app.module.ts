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

const appRoutes: Routes = [
  {path: 'stolen-vehicle', component: StolenVehicleComponent},
  {path: 'add-stolen-vehicle', component: AddStolenVehicleComponent},
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
