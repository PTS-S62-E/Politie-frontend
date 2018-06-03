import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css']
})
export class VehicleSelectorComponent implements OnInit {

  @Input()
  public vehicles: Observable<EuropolVehicle[]>;

  private _filteredVehicles = new BehaviorSubject([]);
  public filteredVehicles = this._filteredVehicles.asObservable();

  @Output()
  public vehicleSelected = new EventEmitter<EuropolVehicle>();
  public searchQuery = '';
  public selectedVehicle: EuropolVehicle;
  private _selectedVehicle = new BehaviorSubject<EuropolVehicle>(null);

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.vehicles.subscribe(v => this._filteredVehicles.next(v));
  }

  public executeSearch(e: Event) {
    this.vehicles.subscribe(vehicles => {
      const filteredVehicles = vehicles.filter(v => this.searchQuery === '' || (v.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1));
      console.log(`Search found ${filteredVehicles.length} for query ${this.searchQuery}`);
      this._filteredVehicles.next(filteredVehicles);
    });
    e.preventDefault();
    console.log('Prevented default');
  }

  public markStolen() {
    this.vehicleService.addStolenVehicle(this.searchQuery);
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
