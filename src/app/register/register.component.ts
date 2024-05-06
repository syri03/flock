import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  email:string|undefined;
  password:string|undefined;
  name:string|undefined;
  lastname:string|undefined;
  username:string|undefined;
  ville:string|undefined;
  phonenumber:string|undefined;
  msgerreur:string="";

  ngOnInit(){}

  constructor(public http:HttpClient,private router: Router){}

  inscription()
  {
    if(this.email==undefined && this.password ==undefined)
      {
        this.msgerreur =" Saisir email and password";
      }
      else
      {
        this.http.post("http://localhost/dashboard/riproject/inscription.php",
        {"email":this.email, "password":this.password,"name":this.name,"lastname":this.lastname,"ville":this.ville,"phonenumber":this.phonenumber,"username":this.username},
         {observe:'response',responseType: 'json'}).subscribe(
          {
              next : (response)=>{
                if(response.status ==201){
                  alert("Ajout client effectué avec succès");
                  
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
