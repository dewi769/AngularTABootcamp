import { AngsuranService } from './../../service/angsuran.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPerhitungan } from 'src/app/interface/i-perhitungan';

@Component({
  selector: 'app-angsuran',
  templateUrl: './angsuran.component.html',
  styleUrls: ['./angsuran.component.css']
})
export class AngsuranComponent implements OnInit{

  perhitungan: IPerhitungan = {} as IPerhitungan;
  estimasi :Array<IPerhitungan> = [];
  
  ngOnInit(): void {
   this.perhitungan = history.state;
   if ('navigationId' in this.perhitungan) {
    // Jika ada, menghapus properti navigationId
    delete this.perhitungan.navigationId;
    }
   this.onAllAngsuran();
   console.log(this.perhitungan) 
  }

  constructor (
    private angsuranService: AngsuranService,
    private router : Router
  ) {}
  
  onAllAngsuran() {
    this.angsuranService.getAllAngsuran(this.perhitungan.tipeMobil, this.perhitungan.tahunMobil, this.perhitungan.asuransi).subscribe
    ((response: Array<IPerhitungan>) => {
      this.estimasi = response
      console.log(this.estimasi)
    });
  }

  onAjukan(index: number){
    this.perhitungan.pencairan = this.estimasi[index].pencairan;
    this.perhitungan.angsuran = this.estimasi[index].angsuran;
    this.perhitungan.tenor = this.estimasi[index].tenor;
    this.router.navigateByUrl('/isRO',{ state: this.perhitungan} );
  }


}
