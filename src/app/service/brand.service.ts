import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWilayah } from '../interface/i-wilayah';
import { environment } from '../environments/environment.development';
import { IBrand, IBrandWrapper } from '../interface/i-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  getAll() {
    throw new Error('Method not implemented.');
  }

  api :string = environment.baseurl;
  brandAll: string = "/api/v1/brand";
  updBrand: string = "/api/v1/brand/update";
  delBrand: string = "/api/v1/brand/delete";
  

  constructor(private httpClient: HttpClient) { }

  getAllBrand(): Observable<Array<IBrand>>{
    return this.httpClient.get<Array<IBrand>>(
      `${this.api}${this.brandAll}`
    )
  }

  getAllBrandByWilayahId(wilayahId: number): Observable<Array<IBrand>>{
    const headers = {
      'Content-Type': 'application/json',
    }

    return this.httpClient.get<Array<IBrand>>(
      `${this.api}/api/v1/brand/${wilayahId}`,
      { headers }
    )
  }


  updateBrand(id: number, brand: IBrand): Observable<IBrandWrapper>{
    const headers = {
      "Content-Type": "application/json"
    };
    let body = JSON.stringify(brand);
    return this.httpClient.put<IBrandWrapper>(
      `${this.api}${this.updBrand}/${id}`,body,
      {headers}
    );
  }

  deleteBrand(id: number): Observable<IBrandWrapper> {
    return this.httpClient.delete<IBrandWrapper>(
      `${this.api}${this.delBrand}/${id}`
    )
  }

  savebrand(brand: IBrand): Observable<any>{
    const headers = {
      "Content-Type": "application/json"
    };
    let body = JSON.stringify(brand);
    return this.httpClient.post<any>(
      `${this.api}${this.brandAll}/save`,body,
      {headers}
    );
  }


}
