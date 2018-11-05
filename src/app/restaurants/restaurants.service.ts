import { Restaurant } from "./restaurant/restaurant.model";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) { }

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEAT_API}/restaurants`)
        .pipe(map(r => r.json()))
    }

}
