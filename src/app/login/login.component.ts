import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {  HttpClient,HttpClientModule,HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf,FormsModule,HttpClientModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})



export class LoginComponent implements OnInit {
  username:string|undefined;
  name:string|undefined;
  lastname:string|undefined;
  msgerreur:string="";
  email:string|undefined;
  password:string|undefined;
 

 
  ngOnInit(){}
  constructor(public http:HttpClient,private router: Router){}
 
  login()
  {
      if(this.email==undefined && this.password ==undefined)
      {
        this.msgerreur =" Saisir email and password";
      }
      else
      {
        this.http.post("http://localhost/dashboard/riproject/login.php",
        {"email":this.email, "password":this.password},
         {observe:'response',responseType: 'json'}).subscribe(
          {
              next : (response)=>{
                if(response.status ==201)
                  {
                  alert("success");
                  const body: any = response.body;
                  localStorage.clear();
                  localStorage.setItem('userinfo', JSON.stringify({ username: body.username, name:body.name, lastname:body.lastname,email:this.email }));               
                  this.router.navigate(["/navbar"]);
                }
                  
                else
                  {
                   const body:any=  response.body;
                    alert("Echec : "+ body['msg']);}
              },
              error: (error)=> this.msgerreur = error
          }

       
        );
      }
  }

}
