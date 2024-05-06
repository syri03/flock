import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  eventdata: any;
  tab1:any;
  tab4:any;

  constructor(private http: HttpClient, private router: Router){}

  afficheview(){
    const localdata=localStorage.getItem("eventData");
    if (localdata) {
      const x = JSON.parse(localdata);
      this.tab1=x;
    }
  }

  attendevent(){
    const localdata=localStorage.getItem("userinfo");
    if (localdata) {
      const x = JSON.parse(localdata);
      this.tab4=x;
    }
    alert(this.tab4);
  }
  

  ngOnInit() {
    this.afficheview();
  
  }
}
