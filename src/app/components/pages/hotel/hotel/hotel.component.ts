import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HttpService } from 'src/app/shared/service/http.service';
import { IHotel } from 'src/app/shared/interface/hotel/hotel';
import { ICountry } from 'src/app/shared/interface/country/country';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  
  public Countries: Array<ICountry> = [];
  public Hotels: Array<IHotel> = [];
  public pageSize = 10;
  public page = 1;
  public hotelSelected_id: number[] = [];
  public hotelInSelectCountry!: IHotel;

  @Input() countrySelected: number[] = [];
  @Input() sortHotel: Array<IHotel> = [];
  @Input() hotelSelected: number[] = [];
  @Output()
  public outToParentSelectedHotel = new EventEmitter();

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.GetCountries().subscribe(res => {
      this.Countries = res;
    });
    this.httpService.GetHotels().subscribe(res => {
      if (this.sortHotel) {
        res = this.sortHotel
      }
      for (let i = 0; i < this.countrySelected.length; i++) {
        res.map(item => {
          if (item.country_id === this.countrySelected[i]) {
            this.hotelInSelectCountry = item;
            this.Hotels.push(this.hotelInSelectCountry);
          }
        })
      }
      this.Hotels.map(hotel => {
        if (this.hotelSelected) {
          for (let i = 0; i < this.hotelSelected.length; i++) {
            if (hotel.id == this.hotelSelected[i]) {
              hotel.is_checked = true;
            }
          }
        }
        else {
          hotel.is_checked = false;
        }
        this.Countries.map(country => {
          if (country.id === hotel.country_id) {
            hotel.country_name = country.country_name;
          }
        })
      })
    });
  }

  Hotel_id(hotel_index: any): void {
    if (this.hotelSelected != undefined) {
      this.hotelSelected_id = this.hotelSelected;
    }
    this.Hotels.map(hotel => {
      if (hotel.id === hotel_index) {
        if (hotel.is_checked === false) {
          this.hotelSelected_id.splice(this.hotelSelected_id.indexOf(hotel_index), 1);
        }
        else {
          this.hotelSelected_id.push(hotel_index);
        }
      }
    })
  }

  SendHotel(): void {
    this.outToParentSelectedHotel.emit(this.hotelSelected_id);
  }
}
