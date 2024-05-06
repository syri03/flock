import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule,NgIf,HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  evname?: string;
  location?: string;
  dates?: Date;
  daten?: Date;
  type?: string;
  about?: string;
  note?: string;
  creator?: string;
  msgerreur: string="";
  msgsuccess: string="";
  eventdata: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    
  }

  Modifierevent(){
    if (
      this.evname?.trim() == '' ||
      this.location?.trim() == '' ||
      this.about?.trim() == '' ||
      this.note?.trim() == '' ||
      this.type?.trim() == '' ||
      this.creator?.trim() == '' ||
      !this.dates ||
      !this.daten
    ) {
      this.msgerreur = "Saisir tous les champs obligatoires";
    }else{
      const Info: string | null = localStorage.getItem("titre");
      alert(Info);
      if (Info) {
        

        this.http.put("http://localhost/dashboard/riproject/home.php",{
          "ancien":Info,
          "location": this.location,
          "dates": this.dates,
          "daten": this.daten,
          "type": this.type,
          "note": this.note,
          "creator": this.creator,
          "about": this.about,
          "evname": this.evname
        }, {observe:'response', responseType: 'json'}).subscribe({
          next: (response) => {
            if (response.status == 201) {
              this.msgsuccess = "Informations Modifiée avec succés";
              this.ngOnInit();
              localStorage.removeItem('titre');
            } else {
              const body: any = response.body;
              this.msgerreur = "Echec : " + body['msg'];
            }
          },
          error: (error)=> this.msgerreur = error
        });
      }
      else{
        alert("errrrrrooroer");
      }
    }
  }

}
