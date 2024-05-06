import { Component } from '@angular/core';
import { ViewComponent } from '../view/view.component';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { EditComponent } from '../edit/edit.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ViewComponent,MatDialogActions,HttpClientModule,NgFor,EditComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  eventdata: any;
  msgerreur: string="";
  msgsuccess: string="";
  constructor(private dialog:MatDialog,private http: HttpClient, private router: Router){}


  openDialog(titre:string,type:string,note:string,location:string,creator:string,start:string,end:string,description:string){
    const myEventData = {
      titre:titre ,
      type:type ,
      note:note ,
      location:location ,
      creator: creator,
      start:start,
      end:end,
      description: description
    };
    const eventDataJSON = JSON.stringify(myEventData);
    localStorage.setItem("eventData", eventDataJSON);
    
    const dialogRef = this.dialog.open(ViewComponent);navigator
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:${result}`);
    });
  }

  openDialog1(titre:string){
    localStorage.setItem("titre",titre);
    const dialogRef = this.dialog.open(EditComponent);navigator
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:${result}`);
    });
  }
  
  afficheevent() {
    this.http.get<any>(`http://localhost/dashboard/riproject/home.php`)
      .subscribe(data => {
        this.eventdata = data;
      });
  }

  deleteevent(evname: string){
    this.http.delete<any>(`http://localhost/dashboard/riproject/home.php?tev=${evname}`)
      .subscribe(response => {
        if (response.message == "Suppression effectuée") {
          this.msgsuccess= "event supprimé avec succés";
          this.ngOnInit();
        } else {
          this.msgerreur = "Erreur lors du suppression";
        }
      });
  }




  ngOnInit() {
    this.afficheevent();
  
  }
}
