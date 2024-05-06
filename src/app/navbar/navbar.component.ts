import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { CreateComponent } from '../create/create.component';
import { HomeComponent } from '../home/home.component';
import { MessagesComponent } from '../messages/messages.component';
import { PlusComponent } from '../plus/plus.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, CommonModule, ProfileComponent,CreateComponent, HomeComponent,MessagesComponent,PlusComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showprofile: boolean = false;
  showhome :boolean = true;
  showcreate :boolean =false;
  showplus:boolean=false;
  tab:any;

  ngOnInit() {
    const localdata=localStorage.getItem("userinfo");
    if(localdata!=null){
      this.tab=JSON.parse(localdata);
    }
  }

  profile() {
    this.showprofile = true;
    this.showplus=false;
    this.showhome = false;
    this.showcreate = false;
 
  }

  login() {
    this.showprofile = false;
    this.showplus=false;
    this.showhome = false;
    this.showcreate = false;
    
  }

  register() {
    this.showprofile = false;
    this.showplus=false;
    this.showhome = false;
    this.showcreate = false;
   
  }

  home() {
    this.showprofile = false;
    this.showplus=false;
    this.showhome = true;
    this.showcreate = false;
   
  }

  create() {
    this.showprofile = false;
    this.showplus=false;
    this.showhome = false;
    this.showcreate = true;

  }
  plus() {
    this.showprofile = false;
    this.showplus=true;
    this.showhome = false;
    this.showcreate = false;

  }


 
  }

