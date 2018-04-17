import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../classes/Vehicle';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-add-stolen-vehicle',
  templateUrl: './add-stolen-vehicle.component.html',
  styleUrls: ['./add-stolen-vehicle.component.css']
})
export class AddStolenVehicleComponent implements OnInit {

  public selectedVehicle: Vehicle;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
  }

  public showVehicleInformation() {

  }

  // public setSelectedVehicle(vehicle: Vehicle) {
  //  this.selectedVehicle = vehicle;
  // }

}
