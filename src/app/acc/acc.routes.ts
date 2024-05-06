import { Routes } from '@angular/router';
import { AccComponent } from './acc.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';



export const routes: Routes = [
    { path: '', redirectTo:'/acc', pathMatch:'full' },
    { path: 'acc', component: AccComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
  
];