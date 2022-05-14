import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HttpService } from 'src/app/shared/service/http.service';
import { ITicket } from 'src/app/shared/interface/ticket/ticket';
import { IHotel } from 'src/app/shared/interface/hotel/hotel';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public Tickets: Array<ITicket> = [];
  public pageSize = 10;
  public page = 1;
  public ticketSelected_id: number[] = [];
  public ticketInSelectHotel!: ITicket;
  public modal = false;
  public status200 = false;
  public text: any;
  public Hotels: Array<IHotel> = [];

  @Input() hotelSelected: number[] = [];
  @Input() countrySelected: number[] = [];
  @Input() sortTicket: Array<ITicket> = [];
  @Input() ticketSelected: number[] = [];
  @Output()
  public outToParentSelectedTicket = new EventEmitter();

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.GetHotels().subscribe(res => {
      this.Hotels = res;
    })
    this.httpService.GetTickets().subscribe(res => {
      if (this.sortTicket) {
        res = this.sortTicket
      }
      for (let i = 0; i < this.countrySelected.length; i++) {
        for (let j = 0; j < this.hotelSelected.length; j++) {
          res.map(ticket => {
            this.Hotels.map(hotel => {
              if ((hotel.id === this.hotelSelected[j]) && (ticket.country_id === this.countrySelected[i]))
                if (ticket.flight_city_to === hotel.country_city) {
                  {
                    this.ticketInSelectHotel = ticket;
                    this.Tickets.push(this.ticketInSelectHotel);

                  }
                }
            })
          })
        }
      }
      this.Tickets.map(ticket => {
        if (this.ticketSelected) {
          for (let i = 0; i < this.ticketSelected.length; i++) {
            if (ticket.id === this.ticketSelected[i]) {
              ticket.is_checked = true;
            }
          }
        }
        else {
          ticket.is_checked = false;
        }
      })
    });
  }

  Ticket_id(ticket_index: any): void {
    if (this.ticketSelected != undefined) {
      this.ticketSelected_id = this.ticketSelected;
    }
    this.Tickets.map(ticket => {
      if (ticket.id === ticket_index) {
        if (ticket.is_checked === false) {
          this.ticketSelected_id.splice(this.ticketSelected_id.indexOf(ticket_index), 1);

        }
        else {
          this.ticketSelected_id.push(ticket_index);
        }
      }
    })
  }
  SendTicket(): void {
    this.outToParentSelectedTicket.emit(this.ticketSelected_id);
    this.modal = true;
    this.text = 'Замовити обраний тур?';
    this.status200 = false;
  }
  Order() {
    this.httpService.Ordertour().subscribe(res => {
      this.text = Object.values(res);
    })
    this.status200 = true;

  }
  Close() {
    this.modal = false;
  }
  CloseAll() {
    this.modal = false;
    window.location.reload();
  }
}
