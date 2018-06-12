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

    this.warning = '';

    if (this.compareDates(this.convertToDate(this.startDate),
      this.convertToDate(this.startDate))) {
      this.translocationService.getTranslocations(
        this.licensePlate,
        this.createValidDate(this.startDate),
        this.createValidDate(this.endDate));
    }
    else {
      this.warning = 'end date should be bigger than start date.'
    }
  }

  private compareDates(start: Date, end: Date): Boolean {
    if (end < start) {
      return false;
    }
    return true;
  }

  private convertToDate(date: String): Date {
    return new Date("13-01-2011".replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  }

  private createValidDate(date: String): String {
    var validDate = date + 'T00:00:00.000Z';
    validDate = validDate.replace(/ /g, "%20");
    validDate = validDate.replace(/:/g, "%3A");
    return validDate;
  }

  ngOnInit() {
  }

}
