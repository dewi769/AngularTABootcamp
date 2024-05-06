export interface IWilayah {
    idWilayah:number;
    kodeWilayah: string;
    provinsi: string;
}

export interface IWilayahWrapper {
    data: IWilayah;
    success: string;
    errorCode:string;
    message: string;
    status: number;
    timestamp:string;
  }
  