import { IBrand } from "./i-brand";
import { IWilayah } from "./i-wilayah";

export interface IVehicle {
    idVehicle : number;
    harga: number;
    tipeMobil: string;
    brand: IBrand;
}

export interface IVehicleWrapper {
    data: IVehicle;
    success: string;
    errorCode:string;
    message: string;
    status: number;
    timestamp:string;
}