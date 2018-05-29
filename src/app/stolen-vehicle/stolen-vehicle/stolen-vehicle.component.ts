import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-stolen-vehicle',
  templateUrl: './stolen-vehicle.component.html',
  styleUrls: ['./stolen-vehicle.component.css']
})
export class StolenVehicleComponent implements OnInit {

  public selectedVehicle: EuropolVehicle;

  constructor(public vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.vehicleService.getVehicles();
  }

  public setSelectedVehicle(vehicle: EuropolVehicle) {
    this.selectedVehicle = vehicle;
  }

}
