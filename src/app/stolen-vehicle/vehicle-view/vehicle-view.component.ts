import {Component, Input, OnInit} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  @Input() vehicle: EuropolVehicle;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
  }

  markFound() {
    this.vehicleService.removeStolenVehicle(this.vehicle.id);
  }
}
