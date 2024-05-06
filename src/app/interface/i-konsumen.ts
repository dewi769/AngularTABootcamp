export interface IKonsumen {

    nik: string,
    noKontrak:string,
    nama: string,
    noHp: string,
    tglLahir:string,
    noRek: string,
    status: string,
    domisili: string
}

export interface IKonsumenWrapper {
    data: IKonsumen;
    success: string;
    errorCode:string;
    message: string;
    status: boolean;
    timestamp:string;
  }