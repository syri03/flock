import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plus',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './plus.component.html',
  styleUrl: './plus.component.css'
})
export class PlusComponent {
  msgerreur: string = "";
  fullname: string | undefined;
  about: string | undefined;
  phone: string | undefined;
  job: string | undefined;
  country: string | undefined;
  tiktok: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  tab3:any;
  
  constructor(public http: HttpClient) { }
  ngOnInit() {
    const localdata=localStorage.getItem("userinfo");
    if (localdata) {
      const x = JSON.parse(localdata);
      this.tab3=x;
      alert(this.tab3);
    }
  }
  save() {
    this.http.post("http://localhost/dashboard/riproject/profile.php",
      {
         "f": this.fullname, "a": this.about, "j": this.job, "c": this.country,
        "pn": this.phone, "t": this.tiktok, "F": this.facebook, "I": this.instagram,"e":this.tab3.email
      },
      { observe: 'response', responseType: 'json' }).subscribe(
        {
          next: (response) => {
            if (response.status == 201) {
              alert("Success");
              const a=  {
                "f": this.fullname, "a": this.about, "j": this.job, "c": this.country,
               "pn": this.phone, "t": this.tiktok, "F": this.facebook, "I": this.instagram
             };
              const eventDataJSON = JSON.stringify(a);
              localStorage.setItem("profile", eventDataJSON);
            }
            else {
              const body: any = response.body;
              alert("Failure: " + body['msg']);
            }
          },
          error: (error) => this.msgerreur = error
        }
      );
  }
}
