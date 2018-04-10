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

const appRoutes: Routes = [
  {path: 'owner-history', component: OwnerHistoryComponent},
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
