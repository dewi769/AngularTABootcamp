import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IBrand } from 'src/app/interface/i-brand';
import { IVehicle, IVehicleWrapper } from 'src/app/interface/i-vehicle';
import { IWilayah } from 'src/app/interface/i-wilayah';
import { BrandService } from 'src/app/service/brand.service';
import { LoginService } from 'src/app/service/login.service';
import { VehicleService } from 'src/app/service/vehicle.service';
import { WilayahService } from 'src/app/service/wilayah.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.component.html',
  styleUrls: ['./kendaraan.component.css']
})
export class KendaraanComponent implements OnInit {

  vehicles: Array<IVehicle> = [];
  dataVehicles: Array<IVehicle> = [];
  wilayahs: Array<IWilayah> = [];
  brands: Array<IBrand> = [];
  newBrands: Array<IBrand> = [];
  vehicleWrapper: IVehicleWrapper = {} as IVehicleWrapper;

  vehicle: IVehicle = {
    idVehicle: 0,
    harga: 0,
    tipeMobil: "",
    brand: {
        idBrand: 0,
        brandMobil: "",
        wilayah: {
            idWilayah: 0,
            provinsi: "",
            kodeWilayah: ""
        }
    }
  };

  brandId:any;
  wilayahId:any;
  vehicleId:any;
  tipeMobil:string = "";
  hargaMobil:number= 0;
  brandMobil:any;
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
    private wilayahService: WilayahService,
    private brandService: BrandService,
    private vehicleService: VehicleService ) {
  }

  

  ngOnInit(): void {
    this.onAllWilayah();
    this.onAllBrand();
    this.onAllVehicle();
  }

  //WILAYAH
  onDetectIDWilayah() {
    console.log("This Wilayah = ", this.vehicle.brand.wilayah.idWilayah)
    // this.onBrands(this.wilayahId)
    this.brandService.getAllBrandByWilayahId(this.vehicle.brand.wilayah.idWilayah).subscribe((response) => {
      this.newBrands = response;
    })
  }

  //Brand
  onDetectIdBrand() {
    console.log("This brand = ", this.vehicle.brand.idBrand)
    this.brandId = this.brandId;
    // this.onBrands(this.wilayahId)
    this.vehicleService.getAllVehicleByWilayahId(this.vehicle.brand.idBrand).subscribe((response:any) => {
      this.dataVehicles = response;
    })
  }

  onAllWilayah():void {
    this.wilayahService.getAllWilayah().subscribe
    ((response: Array<IWilayah>) => {
      this.wilayahs = response
      // console.log(response)
    });
  }

  onAllBrand():void {
    this.brandService.getAllBrand().subscribe
    ((response: Array<IBrand>) => {
      this.brands = response
      // console.log(this.brands)
    });
  }

  onAllVehicle():void {
    this.vehicleService.getAllVehicle().subscribe
    ((response: Array<IVehicle>) => {
      this.dataVehicles = response
      this.vehicles = response
      this.collectionSize = this.vehicles.length;
      this.pagingVehicle();
    });
  }

  pagingVehicle(): void {
    let filteredVehicle = this.vehicles.filter(vehicle =>
      vehicle.brand.wilayah.provinsi?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vehicle.tipeMobil?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vehicle.brand.brandMobil?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredVehicle.length);
    this.vehicles = filteredVehicle.slice(startIndex, endIndex).map((vehicle, index) => {
      return {
        ...vehicle,
        id: index + startIndex + 1
      };
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.pagingVehicle();
  }

  onSearch(): void {
    this.page = 1;
    this.onAllVehicle();
  }

  tambahData(): void {
    const newData = {
      idVehicle: 0,
      harga: 0,
      tipeMobil: "",
      brand: {
          idBrand: 0,
          brandMobil: "",
          wilayah: {
              idWilayah: 0,
              provinsi: "",
              kodeWilayah: ""
          }
      }
    };
    this.vehicle = newData;
  }

  edit(v: IVehicle): void {
    this.brandId = v.brand.idBrand
    this.brandMobil = v.brand.brandMobil
    this.wilayahId = v.brand.wilayah.idWilayah
    this.provinsi = v.brand.wilayah.provinsi
    this.vehicleId = v.idVehicle
    this.tipeMobil = v.tipeMobil

    console.log(v)
    this.vehicle = v
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


  onUpdateVehicle(id: number): void {
    this.vehicle.brand.idBrand = this.brandId;
    this.vehicleService.updateVehicle(id, this.vehicle)
    .pipe(catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error.error.message || 'An error occurred during update';
      return throwError(() => new Error("Error updating brand"));
    }))
    .subscribe((response: any) => {
      this.vehicleWrapper = response;
      if (this.vehicleWrapper.errorCode === "FV01001") {
        Swal.fire({
          title: 'Success!',
          html: `<p>${this.vehicleWrapper.message}</p>`,
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
          html: `<p>${this.vehicleWrapper.message}</p>`,
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

  onSaveVehicle(): void {
    this.vehicleService.saveVehicle(this.vehicle)
      .subscribe(
        (response) => {
          Swal.fire({
            title: 'SUCCESS!',
            text: 'Tambah Data Kendaraan Berhasil',
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

  onDeleteVehicle(id:number){
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus Data ini?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deletevehicle(id)
          .subscribe((response: IVehicleWrapper)=>{
              this.vehicleWrapper = response;
            }
          )
        Swal.fire({
          title: 'SUCCESS!',
          text: 'Data Kendaraan Berhasil di Hapus!',
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
