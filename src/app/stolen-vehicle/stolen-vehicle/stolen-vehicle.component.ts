import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../classes/Vehicle';

@Component({
  selector: 'app-stolen-vehicle',
  templateUrl: './stolen-vehicle.component.html',
  styleUrls: ['./stolen-vehicle.component.css']
})
export class StolenVehicleComponent implements OnInit {

  public selectedVehicle: Vehicle;

  constructor() {
  }

  ngOnInit() {
  }

  public setSelectedVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }

}
