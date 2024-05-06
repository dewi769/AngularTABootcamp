import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { IPerhitungan, IPerhitunganWrapper } from '../interface/i-perhitungan';
import { IKonsumenWrapper } from '../interface/i-konsumen';

@Injectable({
  providedIn: 'root'
})
export class PengajuanService {

  api :string = environment.baseurl;
  Pengajuan: string = "/api/v1/pengajuan";
  Konsumen: string = "/api/v1/konsumen"

  constructor(private httpClient: HttpClient) { }

  saveData(pengajuan: IPerhitungan): Observable<IPerhitungan>{
    const headers = {
      "Content-Type": "application/json"
    };
    let body = JSON.stringify(pengajuan);
    return this.httpClient.post<IPerhitungan>(
      `${this.api}${this.Pengajuan}/save`,body,
      {headers}
    );
  }

  findByNoKontrak(noKontrak: number): Observable<IKonsumenWrapper>{
    const headers = {
      'Content-Type': 'application/json',
    }

    return this.httpClient.get<IKonsumenWrapper>(
      `${this.api}${this.Konsumen}/${noKontrak}`,
      { headers }
    )
  }

  findAllPengajuan(): Observable<Array<IPerhitungan>>{
    const headers = {
      'Content-Type': 'application/json',
    }

    return this.httpClient.get<Array<IPerhitungan>>(
      `${this.api}${this.Pengajuan}/findAll`,
      { headers }
    )
  }

  

}
