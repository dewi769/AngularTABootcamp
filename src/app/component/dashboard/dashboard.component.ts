import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  isChecked: boolean = false;

  constructor(private router : Router) { }



  next() {
    if (this.isChecked == true) {
      this.router.navigateByUrl("/main"); // Ganti '/halaman-selanjutnya' dengan URL halaman selanjutnya
    } 
  }
}
