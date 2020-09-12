import { Injectable } from "@angular/core";
import {
  HttpClient,
} from "@angular/common/http";

import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Api {
  constructor(private _http: HttpClient) {}

  getData() {
    return this._http.get("https://randomapi.com/api/?key=O8YX-WLO3-ATER-PTFW&ref=d5us98ie&fmt=json").pipe(
      map((data) => data),
      catchError((e) => throwError(e))
    );
  }
}
