import {AfterContentInit, Component, Input} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleinfoService} from '../../services/vehicleinfo.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements AfterContentInit {

  @Input()
  public vehicle: BehaviorSubject<EuropolVehicle> = new BehaviorSubject(null);
  public vehicleInfo: BackendVehicleInfo = null;

  private isLoading = true;

  constructor(private vehicleService: VehicleService, private vehicleInfoService: VehicleinfoService, private router: Router) {
  }

  ngAfterContentInit() {
    console.log('Started with vehicle');
    console.log(this.vehicle);
    this.vehicle.subscribe(vehicle => {

      console.log('New vehicle');
      console.log(vehicle);

      if (vehicle.licensePlate === undefined || vehicle.licensePlate === null) {
        return;
      }
      this.vehicleInfoService
        .getVehicleInfo(vehicle.licensePlate)
        .subscribe((info: BackendVehicleInfo) => {
          this.vehicleInfo = info;
        });
    });
  }

  markFound() {
    this.vehicleService.removeStolenVehicle(this.vehicle.getValue().serialNumber);
  }

  liveTrackVehicle() {
    this.router.navigate(['stolen-vehicle/map/?vehicle=' + JSON.stringify(this.vehicle.getValue())]);
  }
}
