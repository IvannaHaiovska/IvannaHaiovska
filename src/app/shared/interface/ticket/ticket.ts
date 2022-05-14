export interface ITicket {
        id: number,
        airline_name: string,
        seats_number: number,
        flight_city_to: string,
        flight_city_from: string,
        country_id: number,
        flight_dates_to: Date,
        flight_dates_from: Date,
        is_checked: boolean
}
