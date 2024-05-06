import { VehicleService } from './../../service/vehicle.service';
import { Router } from '@angular/router';
import { WilayahService } from './../../service/wilayah.service';
import { Component, OnInit } from '@angular/core';
import { IWilayah } from 'src/app/interface/i-wilayah';
import { IBrand } from 'src/app/interface/i-brand';
import { BrandService } from 'src/app/service/brand.service';
import { IVehicle } from 'src/app/interface/i-vehicle';
import { Observable } from 'rxjs';
import { IPerhitungan } from 'src/app/interface/i-perhitungan';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  wilayahs: Array<IWilayah> = [];
  brands: Array<IBrand> = [];
  vehicles: Array<IVehicle> = [];
  perhitungan: IPerhitungan = {} as IPerhitungan;

  splitBrand: any;
  carService: any;
  splitWilayah: any;
  cars: any;
  wilayahId: any;
  vehicle: any;
  brandId: any ;
  vehicleId: any;
  id: any;
  namaAsuransi: any;
  currentYear: number = new Date().getFullYear();
  lastYear: number[] = [];
  tahunMobil: any;
  hargaMobil:  any;

  constructor( 
    private WilayahService: WilayahService,
    private router: Router,
    private brandService: BrandService,
    private vehicleService: VehicleService) { 
   }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.onAllWilayah();
    for (let i = 0; i<20; i++) {
      this.lastYear.push(this.currentYear - i);
    }
  }

// WILAYAH
  onAllWilayah():void {
    this.WilayahService.getAllWilayah().subscribe
    ((response: Array<IWilayah>) => {
      this.wilayahs = response
      console.log(response)
    });
  }

  onDetectIDWilayah() {
    console.log("tester wilayah", this.wilayahId)
    // this.onBrands(this.wilayahId)
    this.brandService.getAllBrandByWilayahId(this.wilayahId).subscribe((response) => {
      this.brands = response;
    })
  }

  //Brand

  onDetectIdBrand() {
    console.log("This brand = ", this.brandId)
    this.brandId = this.brandId;
    // this.onBrands(this.wilayahId)
    this.vehicleService.getAllVehicleByWilayahId(this.brandId).subscribe((response:any) => {
      this.vehicles = response;
    })
  }

  onDetectVehicle() {
    console.log("This vehicle = ", this.vehicleId)
    this.vehicleService.getVehicleById(this.vehicleId).subscribe((response:IVehicle) => {
      this.hargaMobil = response.harga;
      console.log(this.hargaMobil)
    })
  }

  //Asuransi
  onDetectAsuransi() {
    console.log("This Asuransi: ", this.namaAsuransi)
  }
  
  //Tahun Mobil
  onDetectTahunMobil() {
    console.log("This Tahun Mobil: ", this.tahunMobil)
  }

  onHitung() {
    this.perhitungan.wilayah=this.wilayahId;
    this.perhitungan.brandMobil=this.brandId;
    this.perhitungan.tipeMobil=this.vehicleId;
    this.perhitungan.asuransi=this.namaAsuransi;
    this.perhitungan.tahunMobil=this.tahunMobil;
    this.perhitungan.hargaMobil=this.hargaMobil;
    console.log(this.perhitungan)
    this.router.navigateByUrl('/angsuran', {state: this.perhitungan})
  }

}
