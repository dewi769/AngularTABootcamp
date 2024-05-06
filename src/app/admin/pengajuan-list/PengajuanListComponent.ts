
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPerhitungan } from 'src/app/interface/i-perhitungan';
import { LoginService } from 'src/app/service/login.service';
import { PengajuanService } from 'src/app/service/pengajuan.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pengajuan-list',
  templateUrl: './pengajuan-list.component.html',
  styleUrls: ['./pengajuan-list.component.css']
})
export class PengajuanListComponent implements OnInit {


  pengajuans: Array<IPerhitungan> = [];
  perhitungan: IPerhitungan = {} as IPerhitungan;
  names = localStorage.getItem("USERNAME")

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  searchQuery: string = '';

  constructor(
    private pengajuanService: PengajuanService,
    private router: Router,
    private loginService: LoginService) {
  }

  

  ngOnInit(): void {
    this.onAllPengajuan();
    // throw new Error('Method not implemented.');
  }

  onAllPengajuan(): void {
    this.pengajuanService.findAllPengajuan().subscribe((response: Array<IPerhitungan>) => {
      this.pengajuans = response;
      this.collectionSize = this.pengajuans.length;
      this.updatePengajuans();
      console.log(response);
    });
  }

  updatePengajuans(): void {
    let filteredPengajuans = this.pengajuans.filter(pengajuan =>
      pengajuan.nama?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      pengajuan.noKontrak?.toString().toLowerCase().includes(this.searchQuery.toUpperCase()) || 
      pengajuan.namaMobil?.toLowerCase().includes(this.searchQuery.toLowerCase()) 
    );

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredPengajuans.length);
    this.pengajuans = filteredPengajuans.slice(startIndex, endIndex).map((pengajuan, index) => {
      return {
        ...pengajuan,
        id: index + startIndex + 1
      };
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.updatePengajuans();
  }

  onSearch(): void {
    this.page = 1;
    this.onAllPengajuan();
  }

  details(p: IPerhitungan): void {
    this.perhitungan = p;
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

  



}
