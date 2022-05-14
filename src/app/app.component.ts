import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson12';
  public sortHotel: any;
  public isCountry: any;
  public sortTicket:any;

  receiveFromChildHotel(event: string) {
    this.sortHotel = event;
  }
  receiveFromChildTicket(event: string) {
    this.sortTicket = event;
    
  }
  receiveFromChildisCountry(event: boolean) {
    this.isCountry = event;
  }
}
