import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css']
})
export class VehicleSelectorComponent implements OnInit {

  @Input()
  public vehicles: EuropolVehicle[] = [];
  public filteredVehicles: EuropolVehicle[] = [];
  @Output()
  public vehicleSelected = new EventEmitter<EuropolVehicle>();
  public searchQuery = new BehaviorSubject('').asObservable();
  public selectedVehicle: EuropolVehicle;
  private _selectedVehicle = new BehaviorSubject<EuropolVehicle>(null);

  constructor() {
  }

  ngOnInit() {
    this.searchQuery.subscribe(query => {
      this.filteredVehicles = this.vehicles.filter(vehicle => {
        return vehicle.id.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    });
    this.filteredVehicles = this.vehicles;
  }

  public isThisVehicleSelected(vehicle: EuropolVehicle) {
    return this.selectedVehicle !== undefined &&
      this.selectedVehicle !== null &&
      vehicle !== undefined &&
      vehicle !== null &&
      this.selectedVehicle.id === vehicle.id;
  }

  public selectVehicle(vehicle: EuropolVehicle) {
    this.selectedVehicle = vehicle;
    this._selectedVehicle.next(vehicle);

    if (this.vehicleSelected) {
      this.vehicleSelected.emit(vehicle);
    }
  }

}
