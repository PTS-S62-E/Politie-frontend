import { Component, OnInit } from '@angular/core';
import { TranslocationService } from '../services/translocation.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslocationDto } from '../classes/TranslocationDto';

@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.component.html',
  styleUrls: ['./history-map.component.css']
})
export class HistoryMapComponent implements OnInit {

  public warning: String;
  public licensePlate: String;
  public startDate: String;
  public endDate: String;
  public translocations: TranslocationDto[];

  private subscription: Subscription;

  constructor(private translocationService: TranslocationService) {

    this.subscription = this.translocationService.$translocations.subscribe(translocations => {
      this.translocations = translocations;
    });

  }

  public getHistory() {

    this.translocationService.getTranslocations(
      this.licensePlate,
      this.createValidDate(this.startDate),
      this.createValidDate(this.endDate));
  }

  private createValidDate(date: String) {
    var validDate = date + 'T00:00:00.000Z';
    validDate = validDate.replace(/ /g, "%20");
    validDate = validDate.replace(/:/g, "%3A");
    return validDate;
  }

  ngOnInit() {
  }

}
