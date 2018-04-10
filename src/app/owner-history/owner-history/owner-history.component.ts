import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../classes/Vehicle';

@Component({
  selector: 'app-owner-history',
  templateUrl: './owner-history.component.html',
  styleUrls: ['./owner-history.component.css']
})
export class OwnerHistoryComponent implements OnInit {

  public selectedVehicle: Vehicle;

  constructor() {
  }

  ngOnInit() {
  }

  public setSelectedVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }

}
