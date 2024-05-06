import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IWilayah, IWilayahWrapper } from 'src/app/interface/i-wilayah';
import { LoginService } from 'src/app/service/login.service';
import { WilayahService } from 'src/app/service/wilayah.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wilayah',
  templateUrl: './wilayah.component.html',
  styleUrls: ['./wilayah.component.css']
})
export class WilayahComponent implements OnInit{

  wilayahs: Array<IWilayah> = [];
  wilayah: IWilayahWrapper = {} as IWilayahWrapper;
  wilayahNoWrap: IWilayah = {} as IWilayah;

  kodeWilayah: string = "";
  provinsi:  string = "";


  names = localStorage.getItem("USERNAME")

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  searchQuery: string = '';

  constructor(
    // private pengajuanService: PengajuanService,
    private router: Router,
    private loginService: LoginService,
    private wilayahService: WilayahService) {
  }

  

  ngOnInit(): void {
    this.onAllWilayah();
    // throw new Error('Method not implemented.');
  }


  onAllWilayah():void {
    this.wilayahService.getAllWilayah().subscribe
    ((response: Array<IWilayah>) => {
      this.wilayahs = response
      this.collectionSize = this.wilayahs.length;
      this.pagingWilayahs();
      // console.log(response)
    });
  }

  pagingWilayahs(): void {
    let filteredWilayah = this.wilayahs.filter(wilayah =>
      wilayah.provinsi?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      wilayah.kodeWilayah?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredWilayah.length);
    this.wilayahs = filteredWilayah.slice(startIndex, endIndex).map((wilayah, index) => {
      return {
        ...wilayah,
        id: index + startIndex + 1
      };
    });
  }

  edit(w: IWilayah): void {
    this.wilayahNoWrap = w;
    console.log(this.wilayahNoWrap);
    
  }

  onPageChange(page: number): void {
    this.page = page;
    this.pagingWilayahs;
  }

  onSearch(): void {
    this.page = 1;
    this.onAllWilayah();
  }


  onLogout(){
    this.loginService.logout();
    Swal.fire({
      title: 'Logout',
      text: 'Berhasil Logout',
      icon: 'success',
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false
    }).then(() => {
      // Navigasi ke halaman baru setelah SweetAlert selesai
      this.router.navigate(['/login']); // Ganti '/dashboard' dengan URL tujuan Anda
    });
  }

  onUpdatedWilayah(idWilayah: number): void {
    this.wilayahService.updateWilayah(idWilayah, this.wilayahNoWrap)
    .pipe(catchError((error: HttpErrorResponse) => {
      // Display error message from the HttpErrorResponse object
      const errorMessage = error.error.error.message || 'An error occurred during login';
      // console.log(errorMessage);
      Swal.fire({
        title: 'Gagal!',
        html: `<p>${errorMessage}</p>`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return throwError(() => new Error("Error login"));
    }))
    .subscribe((response: IWilayahWrapper) => {
      this.wilayah = response
      if (this.wilayah.errorCode == "FV01001") {
        Swal.fire({
          title: 'Success!',
          html: `<p>${this.wilayah.message}</p>`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } else {
        Swal.fire({
          title: 'Gagal!',
          html: `<p>${this.wilayah.message}</p>`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
  }

  onSaveWilayah(){
    this.wilayahNoWrap.kodeWilayah = this.kodeWilayah;
    this.wilayahNoWrap.provinsi = this.provinsi;
    this.wilayahService.saveWilayah(this.wilayahNoWrap)
    .subscribe((response: IWilayah)=>{
        this.wilayahNoWrap = response;
        // console.log("Respon save : " + response)
        Swal.fire({
          title: 'SUCCESS!',
          text: 'Tambah Data Wilayah Berhasil',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    )
  }

  onDeleteWilayah(id:number){
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus Data ini?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        this.wilayahService.deleteWilayah(id)
          .subscribe((response: IWilayahWrapper)=>{
              this.wilayah = response;
            }
          )
        Swal.fire({
          title: 'SUCCESS!',
          text: 'Data Wilayah Berhasil di Hapus!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    });
    
  }

}
