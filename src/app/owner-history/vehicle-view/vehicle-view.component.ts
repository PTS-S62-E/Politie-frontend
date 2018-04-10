import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../classes/Vehicle';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() {
  }

  ngOnInit() {
  }
}
