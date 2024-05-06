import {  NgIf } from '@angular/common';
import { HttpClient, HttpClientModule,HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  evname?: string;
  location?: string;
  dates?: string;
  daten?: string;
  type?: string;
  about?: string;
  note?: string;
  creator?: string;
  image?: string;
  msgerreur: string="";
  msgsuccess: string="";
  eventdata: any;
  
  constructor(private http: HttpClient, private router: Router) {}
  


  addevent() {
    if (
      
      this.evname?.trim() == '' ||
      this.location?.trim() == '' ||
      this.about?.trim() == '' ||
      this.note?.trim() == '' ||
      this.type?.trim() == '' ||
      this.creator?.trim() == '' ||
      this.image?.trim() == '' ||
      this.dates?.trim() == '' ||
      this.daten?.trim() == '' 
    ) {
      this.msgerreur = "Saisir tous les champs obligatoires";
    } else {
      this.http.post("http://localhost/dashboard/riproject/home.php", {
        "location": this.location,
        "dates": this.dates,
        "daten": this.daten,
        "type": this.type,
        "note": this.note,
        "creator": this.creator,
        "about": this.about,
        "evname": this.evname,
        "image":this.image
      }, { observe: 'response', responseType: 'json' }).subscribe({
        next: (response) => {
          if (response.status == 201) {
            this.msgsuccess = "event ajoutée avec succès";
            alert("success")
            this.ngOnInit();
          } else {
            const body: any = response.body;
            this.msgerreur = "Echec : " + body['msg'];
          }
        },
        error: (error) => this.msgerreur = error
      });
    }
  }


 



ngOnInit() {


}
}
