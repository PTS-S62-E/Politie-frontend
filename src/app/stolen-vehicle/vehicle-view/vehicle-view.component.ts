import {AfterContentInit, Component, Input} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleinfoService} from '../../services/vehicleinfo.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {VehicleInfoResponse} from '../../classes/VehicleInfoResponse';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements AfterContentInit {

  @Input()
  public vehicle: BehaviorSubject<EuropolVehicle> = new BehaviorSubject(null);
  public vehicleInfo: BackendVehicleInfo = null;
  public vehicleOwnership: VehicleInfoResponse = null;

  constructor(private vehicleService: VehicleService, private vehicleInfoService: VehicleinfoService, private router: Router) {
  }

  ngAfterContentInit() {
    this.vehicle.subscribe(vehicle => {
      this.vehicleInfo = null;
      this.vehicleOwnership = null;

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
      this.vehicleInfoService
        .getVehicleOwnership(vehicle.licensePlate)
        .subscribe((info: VehicleInfoResponse) => {
          this.vehicleOwnership = info;
        });
    });
  }

  markFound() {
    this.vehicleService.removeStolenVehicle(this.vehicle.getValue().serialNumber);
  }

  liveTrackVehicle() {
    this.router.navigate(['stolen-vehicle/map', this.vehicle.getValue().licensePlate]);
  }
}
