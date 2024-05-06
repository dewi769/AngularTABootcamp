import { IBrand } from 'src/app/interface/i-brand';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IVehicle, IVehicleWrapper } from '../interface/i-vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  
  

  api :string = environment.baseurl;
  vehicleAll: string = "/api/v1/vehicle";
  updVehicle: string = "/api/v1/vehicle/update";
  delVehicle: string = "/api/v1/vehicle/delete";

  constructor(private httpClient: HttpClient) { }

  getAllVehicleByWilayahId(IdBrand: number): Observable<Array<IVehicle>>{
    const headers = {
      'Content-Type': 'application/json',
    }

    return this.httpClient.get<Array<IVehicle>>(
      `${this.api}/api/v1/vehicle/${IdBrand}`,
      { headers }
    )
  }

  getVehicleById(IdVehicle: number): Observable<IVehicle>{
    const headers = {
      'Content-Type': 'application/json',
    }

    return this.httpClient.get<IVehicle>(
      `${this.api}/api/v1/vehiclebyid/${IdVehicle}`,
      { headers }
    )
  }

  getAllVehicle(): Observable<Array<IVehicle>>{
    return this.httpClient.get<Array<IVehicle>>(
      `${this.api}${this.vehicleAll}`
    )
  }

  updateVehicle(id: number, vehicle: IVehicle): Observable<IVehicleWrapper>{
    const headers = {
      "Content-Type": "application/json"
    };
    let body = JSON.stringify(vehicle);
    return this.httpClient.put<IVehicleWrapper>(
      `${this.api}${this.updVehicle}/${id}`,body,
      {headers}
    );
  }

  deletevehicle(id: number): Observable<IVehicleWrapper> {
    return this.httpClient.delete<IVehicleWrapper>(
      `${this.api}${this.delVehicle}/${id}`
    )
  }

  saveVehicle(vehicle: IVehicle): Observable<any>{
    const headers = {
      "Content-Type": "application/json"
    };
    let body = JSON.stringify(vehicle);
    return this.httpClient.post<any>(
      `${this.api}${this.vehicleAll}/save`,body,
      {headers}
    );
  }

}
