import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccComponent } from './acc/acc.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';


export const routes: Routes = [
    { path: '', redirectTo:'/acc', pathMatch:'full' },
    { path: 'acc', component: AccComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'navbar', component: NavbarComponent },
  
];