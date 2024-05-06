import { IWilayah } from "./i-wilayah";

export interface IBrand {
    idBrand: number;
    brandMobil: string;
    wilayah : IWilayah;
}

export interface IBrandWrapper {
    data: IBrand;
    success: string;
    errorCode:string;
    message: string;
    status: number;
    timestamp:string;
}
  