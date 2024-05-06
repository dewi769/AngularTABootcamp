import { Router } from '@angular/router';
import { PengajuanService } from './../../service/pengajuan.service';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IPerhitungan, IPerhitunganWrapper } from 'src/app/interface/i-perhitungan';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { IKonsumenWrapper } from 'src/app/interface/i-konsumen';


@Component({
  selector: 'app-is-ro',
  templateUrl: './is-ro.component.html',
  styleUrls: ['./is-ro.component.css']
})
export class IsRoComponent implements OnInit {

  perhitungan: IPerhitungan = {} as IPerhitungan;
  konsumen: IKonsumenWrapper = {} as IKonsumenWrapper;

  nik: any;
  namaLengkap: any;
  tglLahir:any;
  noHandphone: any;
  domisili :any;
  noRek: any;
  statusPernikahan: any;
  errorMesage : any = 'Error save';
  currentDate: Date = new Date();
  noKontrak: any;

  wilayah: any;
  brandMobil: any;
  tipeMobil:any;
  hargaMobil:any;
  asuransi :any;
  tahunMobil:any;
  pencairan :any;
  tenor :any;
  angsuran :any;

  selectedStatus: any;
  statusCek: boolean = false;

  constructor(private pengajuanService: PengajuanService, private router : Router) { }

  ngOnInit(): void {
    this.perhitungan = history.state;
    this.wilayah = this.perhitungan.wilayah;
    this.brandMobil = this.perhitungan.brandMobil;
    this.tipeMobil = this.perhitungan.tipeMobil;
    this.hargaMobil = this.perhitungan.hargaMobil;
    this.asuransi = this.perhitungan.asuransi;
    this.tahunMobil = this.perhitungan.tahunMobil;
    this.pencairan = this.perhitungan.pencairan;
    this.tenor = this.perhitungan.tenor;
    this.angsuran = this.perhitungan.angsuran;
    if ('navigationId' in this.perhitungan) {
      // Jika ada, menghapus properti navigationId
      delete this.perhitungan.navigationId;
    }
    console.log(this.perhitungan) 
  }

  onDetectIsRO(){
    console.log("Status RO = " + this.selectedStatus);
  }

  onCek() {
    this.statusCek = true;
    this.pengajuanService.findByNoKontrak(this.noKontrak).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error.error.message || 'An error occurred during Cek Data';
  
        Swal.fire({
          title: 'Gagal !!!',
          html: `<p>${errorMessage}</p>`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        this.statusCek = false;
        return throwError(() => error);
      })
    ).subscribe(
      (response: IKonsumenWrapper) => {
        this.konsumen = response
        if (response.data) {
          this.konsumen.data = response.data;
          console.log("Data Konsumen ",this.konsumen.data);
        } else {
          console.error("Response does not contain 'data' property:", response);
        }
        
        if (this.konsumen.errorCode == "FV01001") {
          Swal.fire({
            title: 'Success!',
            html: `<p>${this.konsumen.message}</p>`,
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }
      }
    );
  }

  onSubmit():void {

    //Jika Reguler
    if(this.selectedStatus == 2){
      this.perhitungan.nik = this.nik;
      this.perhitungan.nama = this.namaLengkap;
      this.perhitungan.tglLahir = this.tglLahir;
      this.perhitungan.noHp = this.noHandphone;
      this.perhitungan.domisili = this.domisili;
      this.perhitungan.noRek = this.noRek;
      this.perhitungan.status = this.statusPernikahan;
      let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      this.perhitungan.noKontrak = "REG"+randomNumber; 
      console.log(this.perhitungan)
      this.pengajuanService.saveData(this.perhitungan)
      .subscribe((response: IPerhitungan)=>{
          this.perhitungan = response;
          // console.log("Respon save : " + this.perhitungan)
          Swal.fire({
            title: 'SUCCESS!',
            text: 'Pengajuan Anda sudah diterima, marketing kami akan menghubungi Anda.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/dashboard");
            }
          });
        }
      )
    }
    //Jika Repeat Order 
    else { 
      this.perhitungan.noKontrak = this.noKontrak;
      this.perhitungan.wilayah = this.wilayah;
      this.perhitungan.brandMobil = this.brandMobil;
      this.perhitungan.tipeMobil = this.tipeMobil;
      this.perhitungan.hargaMobil = this.hargaMobil;
      this.perhitungan.asuransi = this.asuransi;
      this.perhitungan.tahunMobil = this.tahunMobil;
      this.perhitungan.pencairan = this.pencairan;
      this.perhitungan.tenor = this.tenor;
      this.perhitungan.angsuran = this.angsuran
      this.perhitungan.nik = this.konsumen.data.nik
      this.perhitungan.nama = this.konsumen.data.nama
      this.perhitungan.tglLahir = this.konsumen.data.tglLahir
      this.perhitungan.noHp = this.konsumen.data.noHp
      this.perhitungan.domisili = this.konsumen.data.domisili
      this.perhitungan.noRek = this.konsumen.data.noRek
      this.perhitungan.status = this.konsumen.data.status
      
      console.log(this.perhitungan)
      this.pengajuanService.saveData(this.perhitungan)
      .subscribe((response: IPerhitungan)=>{
          this.perhitungan = response;
          // console.log("Respon save : " + response)
          Swal.fire({
            title: 'SUCCESS!',
            text: 'Pengajuan Anda sudah diterima, marketing kami akan menghubungi Anda.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/dashboard");
            }
          });
        }
      )
    }
  }

}
