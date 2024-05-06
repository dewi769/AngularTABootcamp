// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AngsuranComponent } from './component/angsuran/angsuran.component';
import { IsRoComponent } from './component/is-ro/is-ro.component';
import { PengajuanComponent } from './component/pengajuan/pengajuan.component';
import { DisclaimerComponent } from './component/disclaimer/disclaimer.component';
import { PengajuanListComponent } from './admin/pengajuan-list/PengajuanListComponent';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { WilayahComponent } from './admin/wilayah/wilayah.component';
import { BrandComponent } from './admin/brand/brand.component';
import { KendaraanComponent } from './admin/kendaraan/kendaraan.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'angsuran', component: AngsuranComponent },
  { path: 'status', component: IsRoComponent },
  { path: 'pengajuan', component: PengajuanComponent },
  { path: 'disc', component: DisclaimerComponent },
  { path: 'isRO', component: IsRoComponent },
  { path: 'listPengajuan', component: PengajuanListComponent, canActivate: [AuthGuardService]  },
  { path: 'masterWilayah', component: WilayahComponent, canActivate: [AuthGuardService]  },
  { path: 'masterBrand', component: BrandComponent, canActivate: [AuthGuardService]  },
  { path: 'masterKendaraan', component: KendaraanComponent, canActivate: [AuthGuardService]  },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

  // Tambahkan rute lainnya di sini jika diperlukan
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
