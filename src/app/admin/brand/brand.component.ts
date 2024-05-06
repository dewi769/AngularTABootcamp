import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IBrand, IBrandWrapper } from 'src/app/interface/i-brand';
import { IWilayah } from 'src/app/interface/i-wilayah';
import { BrandService } from 'src/app/service/brand.service';
import { LoginService } from 'src/app/service/login.service';
import { WilayahService } from 'src/app/service/wilayah.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Array<IBrand> = [];
  // brand: IBrand = {} as IBrand;
  brandWrapper: IBrandWrapper = {} as IBrandWrapper;
  wilayahs: Array<IWilayah> = [];


  brand: IBrand = {
    idBrand: 0,
    brandMobil: '',
    wilayah: {
      idWilayah: 0,
      kodeWilayah: '',
      provinsi: ''
    }
  };
 
  
  wilayahId:any;
  brandMobil: string = "";
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
    private brandService: BrandService,
    private wilayahService: WilayahService ) {
  }

  

  ngOnInit(): void {
    this.onAllBrand();
    this.onAllWilayah();
    // throw new Error('Method not implemented.');
  }


  onAllBrand():void {
    this.brandService.getAllBrand().subscribe
    ((response: Array<IBrand>) => {
      this.brands = response
      this.collectionSize = this.brands.length;
      this.pagingBrands();
      // console.log(response)
    });
  }

  onAllWilayah():void {
    this.wilayahService.getAllWilayah().subscribe
    ((response: Array<IWilayah>) => {
      this.wilayahs = response
      // console.log(this.wilayahs)
    });
  }

  pagingBrands(): void {
    let filteredBrand = this.brands.filter(brand =>
      brand.brandMobil?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      brand.wilayah.provinsi?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredBrand.length);
    this.brands = filteredBrand.slice(startIndex, endIndex).map((brand, index) => {
      return {
        ...brand,
        id: index + startIndex + 1
      };
    });
  }

  edit(b: IBrand): void {
    this.provinsi = b.wilayah.provinsi
    this.wilayahId = b.wilayah.idWilayah
    // console.log(this.wilayahId)
    this.brand = b;
  }

  onPageChange(page: number): void {
    this.page = page;
    this.pagingBrands();
  }

  onSearch(): void {
    this.page = 1;
    this.onAllBrand();
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

  onDetectIDWilayah(wilayahId: IWilayah) {
   console.log(wilayahId)
    
  }

  onUpdateBrand(id: number): void {
    this.brand.wilayah.idWilayah = this.wilayahId;
    this.brandService.updateBrand(id, this.brand)
    .pipe(catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error.error.message || 'An error occurred during update';
      // console.error(errorMessage);
      return throwError(() => new Error("Error updating brand"));
    }))
    .subscribe((response: any) => {
      this.brandWrapper = response;
      if (this.brandWrapper.errorCode === "FV01001") {
        Swal.fire({
          title: 'Success!',
          html: `<p>${this.brandWrapper.message}</p>`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } else {
        Swal.fire({
          title: 'Failed!',
          html: `<p>${this.brandWrapper.message}</p>`,
          icon: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    });
  }

  onSaveBrand(): void {
    this.brandService.savebrand(this.brand)
      .subscribe(
        (response) => {
          Swal.fire({
            title: 'SUCCESS!',
            text: 'Tambah Data Brand Berhasil',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
        (error) => {
          console.error('Error saat menyimpan data:', error);
        }
      );
  }

  onDeleteBrand(id:number){
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus Data ini?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deleteBrand(id)
          .subscribe((response: IBrandWrapper)=>{
              this.brandWrapper = response;
            }
          )
        Swal.fire({
          title: 'SUCCESS!',
          text: 'Data Brand Berhasil di Hapus!',
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
