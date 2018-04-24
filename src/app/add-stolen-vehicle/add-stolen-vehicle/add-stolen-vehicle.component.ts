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

  public showVehicleInformation(vehicleService: VehicleService, licensePlate: String) {
    vehicleService.getVehicles().subscribe(
      data => {
        data = data as Vehicle[];
        this.selectedVehicle = data.find(function (vehicle) {
          return vehicle.plate === licensePlate.trim();
        });
        console.log(data);
      }
    );
  }
}
