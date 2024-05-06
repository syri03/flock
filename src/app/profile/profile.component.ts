import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgIf,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  {
  tab1:any;
  tab2:any;

  constructor(private http: HttpClient, private router: Router){}

  afficheprofile(){
    
    const localdata=localStorage.getItem("profile");
    if (localdata) {
      const x = JSON.parse(localdata);
      this.tab1=x;
    }
    const a=localStorage.getItem("userinfo");
    if (a) {
      const y = JSON.parse(a);
      this.tab2=y;
    }
  }

  ngOnInit() {
    this.afficheprofile();
  
  }

  

  
}
