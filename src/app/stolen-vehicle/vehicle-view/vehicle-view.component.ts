import {AfterContentInit, Component, Input} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleinfoService} from '../../services/vehicleinfo.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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

  private isLoading = true;

  constructor(private vehicleService: VehicleService, private vehicleInfoService: VehicleinfoService) {
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
}
