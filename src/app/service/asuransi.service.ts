import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { IAsuransi } from '../interface/i-asuransi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsuransiService {

  api :string = environment.baseurl;
  jenisAsuransi: string = "/api/v1/asuransi/jenisAsuransi?jenisAsuransi";

  constructor(private httpclient: HttpClient) { }

  getAllAsuransi(): Observable<Array<IAsuransi>>{
    return this.httpclient.get<Array<IAsuransi>>(
      `${this.api}${this.jenisAsuransi}`
    )
  }
}
