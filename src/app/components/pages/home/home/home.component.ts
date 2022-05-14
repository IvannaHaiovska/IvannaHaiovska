import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ITicket } from 'src/app/shared/interface/ticket/ticket';
import { IHotel } from 'src/app/shared/interface/hotel/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public visible = true;
  public isCountry = false;
  public isHotel = false;
  public isTicket = false;
  public modal = false;
  public countrySelected: number[] = [];
  public hotelSelected: number[] = [];
  public text!: string;
  public ticketSelected: number[] = [];

  @Input() sortHotel: Array<IHotel> = [];
  @Input() sortTicket: Array<ITicket> = [];
  @Input() isVisible!: boolean;
  @Output() isCountryVisible = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  ShowCountries() {
    this.visible = false;
    this.isCountry = true;
    this.isHotel = false;
    this.isTicket = false;
    this.isCountryVisible.emit(this.isCountry);
  }

  ShowHotels() {
    if ((this.countrySelected === undefined) || (this.countrySelected.length === 0)) {
      this.modal = true;
      this.isHotel = false;
      this.isTicket = false;
      this.text = 'Спочатку оберіть країну в яку хочете відправитись у подорож!';
    } else {
      this.modal = false;
      this.visible = false;
      this.isHotel = true;
      this.isCountry = false;
      this.isTicket = false;
    }
  }

  CloseModal() {
    this.modal = false;
  }

  ShowTickets() {
    if ((this.countrySelected === undefined) || (this.hotelSelected === undefined) || (this.countrySelected.length === 0) || (this.hotelSelected.length === 0)) {
      this.modal = true;
      this.isTicket = false;
      this.text = 'Будь ласка, спочатку оберіть країну та готель';
    }
    else {
      this.modal = false;
      this.visible = false;
      this.isHotel = false;
      this.isCountry = false;
      this.isTicket = true;
    }
  }

  receiveFromChildCountry(event: number[]) {
    this.countrySelected = event;
  }

  receiveFromChildHotel(event: number[]) {
    this.hotelSelected = event;
  }
  
  receiveFromChildTicket(event: number[]) {
    this.ticketSelected = event;
  }
}
