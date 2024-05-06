import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { IPerhitungan } from '../interface/i-perhitungan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngsuranService {

  api :string = environment.baseurl;
  findCar: string = "/api/v1/perhitungan?idVehicle";


  constructor(private httpClient: HttpClient) { }

  getAllAngsuran(idVehicle:number, tahunKendaraan:number, jenisAsuransi:string): Observable<Array<IPerhitungan>>{
    return this.httpClient.get<Array<IPerhitungan>>(
      `${this.api}${this.findCar}=${idVehicle}&tahunKendaraan=${tahunKendaraan}&jenisAsuransi=${jenisAsuransi}`
    )
  }

  
}
