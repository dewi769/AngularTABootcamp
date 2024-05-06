import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { IWilayah, IWilayahWrapper } from '../interface/i-wilayah';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WilayahService {
  
  api :string = environment.baseurl;
  wilayahAll: string = "/api/v1/wilayah";
  updWilayah: string = "/api/v1/wilayah/update";
  delWilayah: string = "/api/v1/wilayah/delete";

  constructor(private httpClient: HttpClient) { }

  getAllWilayah(): Observable<Array<IWilayah>>{
    return this.httpClient.get<Array<IWilayah>>(
      `${this.api}${this.wilayahAll}`
    )
  }

  updateWilayah(idWilayah: number, wilayah: IWilayah): Observable<IWilayahWrapper> {
    const url = `${this.api}${this.updWilayah}/${idWilayah}`;
    return this.httpClient.put<IWilayahWrapper>(url, wilayah);
  }

  deleteWilayah(id: number): Observable<IWilayahWrapper> {
    return this.httpClient.delete<IWilayahWrapper>(
      `${this.api}${this.delWilayah}/${id}`
    )
  }

  saveWilayah(wilayah: IWilayah): Observable<IWilayah>{
    const headers = {
      "Content-Type": "application/json"
    };
    let body = JSON.stringify(wilayah);
    return this.httpClient.post<IWilayah>(
      `${this.api}${this.wilayahAll}/save`,body,
      {headers}
    );
  }

}
