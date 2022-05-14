export interface IHotel {
    id: number,
    hotel_name: string,
    vacancies_number: number,
    country_city: string,
    country_name: string,
    country_id: number,
    available_dates_from: Date,
    available_dates_to: Date,
    is_checked: boolean
}
