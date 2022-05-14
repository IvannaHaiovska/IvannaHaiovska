import { Injectable } from '@angular/core';
import { ICountry } from '../interface/country/country';
import { IHotel } from '../interface/hotel/hotel';
import { ITicket } from '../interface/ticket/ticket';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Node/Express API
  REST_API: string = 'http://localhost:3000/';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  // Get all objects
  GetCountries(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(`${this.REST_API}country`);
  }
  
  GetHotels(): Observable<IHotel[]> {
    return this.httpClient.get<IHotel[]>(`${this.REST_API}hotel`);
  }

  GetTickets(): Observable<ITicket[]> {
    return this.httpClient.get<ITicket[]>(`${this.REST_API}ticket`);
  }

  SendDataHotel(date: any) {
    return this.httpClient.post(`${this.REST_API}datehotel`, date);
  }

  SendDataTicket(date: any) {
    return this.httpClient.post(`${this.REST_API}dateticket`, date);
  }

  Ordertour() {
    return this.httpClient.get(`${this.REST_API}order`)
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}