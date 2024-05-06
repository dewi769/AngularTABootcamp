import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './component/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AngsuranComponent } from './component/angsuran/angsuran.component';
import { IsRoComponent } from './component/is-ro/is-ro.component';
import { FormsModule } from '@angular/forms';
import { PengajuanComponent } from './component/pengajuan/pengajuan.component';
import { DisclaimerComponent } from './component/disclaimer/disclaimer.component';
import { HttpClientModule } from '@angular/common/http';
import { PengajuanListComponent } from './admin/pengajuan-list/PengajuanListComponent';
import { LoginComponent } from './admin/login/login.component';
import { WilayahComponent } from './admin/wilayah/wilayah.component';
import { BrandComponent } from './admin/brand/brand.component';
import { KendaraanComponent } from './admin/kendaraan/kendaraan.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    AngsuranComponent,
    IsRoComponent,
    PengajuanComponent,
    DisclaimerComponent,
    PengajuanListComponent,
    LoginComponent,
    WilayahComponent,
    BrandComponent,
    KendaraanComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
