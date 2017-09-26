import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType,HttpResponse } from '@angular/common/http';
import { Forecast } from './forecast.class';
import { ForecastModel } from './forecast.model';
import { ForecastService } from './forecast.service'
import { MetaService } from './meta.service'
import { Meta } from './meta.interface'
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
  meta: Meta;
  metas:Meta[];
  forecastModel:ForecastModel;
  forecast_keys:Array<string>;
  modalRef: BsModalRef;
  forecasted:boolean;
  forecastedVal:string;
  private fragment: string;

  // static readonly api_url = 'http://127.0.0.1:8000/';

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private forecastService: ForecastService,
    private metaService: MetaService,
    private modalService: BsModalService){
    this.forecast = new Forecast;
    this.forecastModel = new ForecastModel;
    this.forecasted = false;
  }
  ngOnInit(): void {

    this.metaService.getAllData().then(response => {
      this.metas = response;

      // console.log(this.metas);

      this.forecastService.getOne(1).then(response => {
        this.forecastModel = response;
        this.forecast_keys = Object.keys(this.forecast);



        // console.log(this.forecast_keys);
        // console.log(this.forecastModel);
      });

    });





  }

  add(fc: ForecastModel): void {
    this.forecasted = false;
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

  findMeta(metas:Meta[], str:string): Meta {
    for (let meta of metas) {
        if(meta.meta_key == str){
          return meta;
        }
    }

    return {id:0, meta_key: '', meta_val: ''};

  }

  hasMeta(metas:Meta[], str:string) {
    for (let meta of metas) {
        if(meta.meta_key == str){
          return true;
        }
    }

    return false;

  }

  toArray(str:string): string[] {
    str = str.replace('[','').replace(']','').replace(/'/g,'');
    let arr = str.split(',');
    return arr;
  }



}
