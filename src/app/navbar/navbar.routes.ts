import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
    
    { path: '', redirectTo:'/acc', pathMatch:'full' },
    { path: 'navbar', component: NavbarComponent },
    { path: 'login', component: LoginComponent },

  
];