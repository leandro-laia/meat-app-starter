import { Restaurant } from "./restaurant/restaurant.model";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { MyErrorHandler } from "app/app.errorHandler";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) { }

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEAT_API}/restaurants`)
        .pipe(map(r => r.json()), catchError(e => MyErrorHandler.handleError(e)))
    }

    restaurantById(id:string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
        .pipe(map(r => r.json()), catchError(e => MyErrorHandler.handleError(e)))
    }

    reviewsOfRestaurant(id:string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
        .pipe(map(r => r.json()), catchError(e => MyErrorHandler.handleError(e)))
    }

    menuOfRestaurant(id:string): Observable<MenuItem> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .pipe(map(r => r.json()), catchError(e => MyErrorHandler.handleError(e)))
    }


}
