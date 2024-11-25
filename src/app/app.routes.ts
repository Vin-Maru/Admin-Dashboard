import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to HomeComponent when the app starts
  { path: 'home', component: HomeComponent },
  
  {path: 'client', component: ClientComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes) // Lazy load admin routes
  },
];
