export interface IPerhitungan {
    idPengajuan: number;
    wilayah: string;
    brandMobil?: string;
    tipeMobil: number;
    hargaMobil?: number;
    asuransi: string;
    tahunMobil: number;
    tenor?: string;
    pencairan: number;
    angsuran?: number;
    nik?: string;
    nama?: string;
    tglLahir: string;
    noHp?: string;
    domisili?: string;
    noRek?: string;
    status?: string;
    noKontrak?: string;
    namaMobil?:string;
    createdDate?: Date
}

export interface IPerhitunganWrapper {
    data: IPerhitungan
    success: boolean;
    errorCode:string;
    message: string;
    status: number;
    timestamp:string;
}
