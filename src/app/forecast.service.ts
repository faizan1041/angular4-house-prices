import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType,HttpResponse } from '@angular/common/http';
import { Forecast } from './forecast.class'
import { ForecastModel } from './forecast.model'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ForecastService {

  api_url = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient){
  }

  getAllData(): Promise<ForecastModel[]> {
    return this.http.get(this.api_url + '/learn/')
               .toPromise()
               .then(response => response as ForecastModel[])
               .catch(err => {
                 if (err.error instanceof Error) {
                   console.log("Client-side error occured.");
                 } else {
                   console.log("Server-side error occured.");
                 }
              });
  }

  getOne(id: number): Promise<ForecastModel> {
    const url = `${this.api_url}/learn/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ForecastModel)
      .catch(err => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  postOne(fc: ForecastModel): Promise<ForecastModel> {
    const url = `${this.api_url}/learn/`;
    if (!fc) { return; }


    return this.http.post(url,fc)
      .toPromise()
      .then(response => response as ForecastModel)
      .catch(err => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  postSteam(fc: ForecastModel) {
    const url = `${this.api_url}/learn/`;
    const req = new HttpRequest('POST', url, fc, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

}
