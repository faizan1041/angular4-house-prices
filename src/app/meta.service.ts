import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType,HttpResponse } from '@angular/common/http';
import { Forecast } from './forecast.class'
import { Meta } from './meta.interface'
import { ForecastModel } from './forecast.model'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MetaService {

  api_url = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient){
  }

  getAllData(): Promise<Meta[]> {
    return this.http.get(this.api_url + '/uid/unique/')
               .toPromise()
               .then(response => response as Meta[])
               .catch(err => {
                 if (err.error instanceof Error) {
                   console.log("Client-side error occured.");
                 } else {
                   console.log("Server-side error occured.");
                 }
              });
  }



}
