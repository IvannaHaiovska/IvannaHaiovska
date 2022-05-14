import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { HttpService } from 'src/app/shared/service/http.service';
import { ICountry } from 'src/app/shared/interface/country/country';
import { IHotel } from 'src/app/shared/interface/hotel/hotel';
import { ITicket } from 'src/app/shared/interface/ticket/ticket';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public Countries: Array<ICountry> = [];
  public Hotels: Array<IHotel> = [];
  public Tickets: Array<ITicket> = [];
  public pageSize = 10;
  public page = 1;
  public countrySelected_id: number[] = [];

  @Input() sortHotel: Array<IHotel> = [];
  @Input() sortTicket: Array<ITicket> = [];
  @Input() countrySelected: number[] = [];
  @Output()
  public outToParentSelectedCountry = new EventEmitter();

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.GetHotels().subscribe(res => {
      this.Hotels = res;
    });
    this.httpService.GetTickets().subscribe(res => {
      this.Tickets = res;
    });

    this.httpService.GetCountries().subscribe(res => {
      this.Countries = res;
      this.Countries.map(country => {
        if (this.countrySelected) {
          for (let i = 0; i < this.countrySelected.length; i++) {
            if (country.id == this.countrySelected[i]) {
              country.is_checked = true;
            }
          }
        }
        else {
          country.is_checked = false;
        }
        if (this.sortHotel) {
          this.sortHotel.map(hotel => {
            if (country.id === hotel.country_id) {
              country.n_hotel++;
            }
          })
        }
        if (this.sortTicket) {
          this.sortTicket.map(ticket => {
            if (country.id === ticket.country_id) {
              country.n_tour++;
            }
          })
        }
        else {
          this.Hotels.map(hotel => {
            if (country.id === hotel.country_id) {
              country.n_hotel++;
            }
          })
          this.Tickets.map(ticket => {
            if (country.id === ticket.country_id) {
              country.n_tour++;
            }
          })
        }
      })
    })
  }

  Country_id(country_index: any): void {
    if (this.countrySelected) {
      this.countrySelected_id = this.countrySelected;
    }
    var i = this.countrySelected_id.indexOf(country_index);
    if (i > -1) {
      this.countrySelected_id.splice(i, 1);
      this.Countries[country_index - 1].is_checked = false;
    }
    else {
      this.countrySelected_id.push(country_index);
      this.Countries[country_index - 1].is_checked = true;
    }
  }
  SendCountry(): void {
    this.outToParentSelectedCountry.emit(this.countrySelected_id);
  }
}
