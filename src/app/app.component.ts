import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType,HttpResponse } from '@angular/common/http';
import { Forecast } from './forecast.class';
import { ForecastModel } from './forecast.model';
import { ForecastService } from './forecast.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {ActivatedRoute} from '@angular/router'; // <-- do not forget to import
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  results = '';
  forecast:Forecast;
  forecastModel:ForecastModel;
  forecast_keys:Array<string>;
  modalRef: BsModalRef;
  forecasted:boolean;
  forecastedVal:string;
  private fragment: string;

  // static readonly api_url = 'http://127.0.0.1:8000/';

  constructor(private route: ActivatedRoute, private http: HttpClient, private forecastService: ForecastService, private modalService: BsModalService){
    this.forecast = new Forecast;
    this.forecastModel = new ForecastModel;
    this.forecasted = false;
  }
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.forecastService.getOne(1).then(response => {
      this.forecastModel = response;
      this.forecast_keys = Object.keys(this.forecast);

      console.log(this.forecastModel);
    });

  }

  add(fc: ForecastModel): void {
    fc = this.forecastModel;
    if (!fc) { return; }

    this.forecastService.postOne(fc).then(response => {
      this.forecasted = true;
      this.forecastedVal = response.SalePrice;
    });

  }



  openModal(template: TemplateRef<any>, fc: ForecastModel) {
    this.modalRef = this.modalService.show(template);
    this.add(fc);
  }



  ngAfterViewChecked(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }


  scrollToForm(){
    window.scrollTo(0,$('header').height());
  }



}
