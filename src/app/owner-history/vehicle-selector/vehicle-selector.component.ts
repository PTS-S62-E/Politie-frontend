import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';
import {Vehicle} from '../../classes/Vehicle';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css']
})
export class VehicleSelectorComponent implements OnInit {

  public selectedVehicle: Vehicle;
  @Output()
  public vehicleSelected: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  private _selectedVehicle: BehaviorSubject<Vehicle> = new BehaviorSubject<Vehicle>(null);
  public readonly $selectedVehicle = this._selectedVehicle.asObservable();

  constructor(public vehicleService: VehicleService) {
  }

  ngOnInit() {
  }

  public isThisVehicleSelected(vehicle: Vehicle) {
    return this.selectedVehicle !== undefined &&
      this.selectedVehicle !== null &&
      vehicle !== undefined &&
      vehicle !== null &&
      this.selectedVehicle.hardwareSn === vehicle.hardwareSn;
  }

  public selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this._selectedVehicle.next(vehicle);

    if (this.vehicleSelected) {
      this.vehicleSelected.emit(vehicle);
    }
  }

}
