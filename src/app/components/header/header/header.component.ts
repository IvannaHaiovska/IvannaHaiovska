import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, Input } from '@angular/core';

import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  public minDate: NgbDate;
  public fromDate!: NgbDate;
  public toDate: NgbDate | null = null;
  public isCalendar = false;
  public dateVisible = false;
  public dateFrom!: string;
  public dateTo!: string;
  public from!: Date;
  public to!: Date;
  public period = {
    from: this.dateFrom,
    to: this.dateTo
  }
  
  @Output() sortHotel = new EventEmitter();
  @Output() sortTicket = new EventEmitter();
  @Input() isCountry!: boolean;

  constructor(
    private httpService: HttpService,
    private eRef: ElementRef,
    calendar: NgbCalendar
  ) {
    this.minDate = calendar.getToday();
  }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    }
    else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.dateTo = this.convertNgbDateToString(this.toDate);
      this.to = this.convertNgbDateToDate(this.toDate);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.dateFrom = this.convertNgbDateToString(this.fromDate);
    this.from = this.convertNgbDateToDate(this.fromDate);
    if (this.dateFrom && this.dateTo) {
      this.period = {
        from: this.dateFrom,
        to: this.dateTo
      }
      this.SendData();
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  toggle() {
    this.isCalendar = !this.isCalendar;
    this.dateVisible = true;
  }

  convertNgbDateToDate(dateToConvert: any) {
    return new Date(dateToConvert.year, dateToConvert.month - 1, dateToConvert.day)
  }

  convertNgbDateToString(dateToConvert: any) {
    return dateToConvert.year + '-' + ('0' + (dateToConvert.month)).slice(-2) + '-' + ('0' + dateToConvert.day).slice(-2);
  }

  SendData() {
    this.httpService.SendDataHotel(this.period).subscribe(
      data =>
        this.sortHotel.emit(data)
    );
    this.httpService.SendDataTicket(this.period).subscribe(
      data =>
        this.sortTicket.emit(data)
    );
  }

  Reload() {
    window.location.reload();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isCalendar = false;
    }
  }
}
