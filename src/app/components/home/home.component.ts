import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { NgForm } from "@angular/forms/public_api";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `Inserimento nuovo colore`;
 indice = 0;
 nometb;
 sottocm;
 idMaster;
 codiceCol;
 sottocat;
 categorieMerceologiche = true;
 sottoCategorie = false;
  constructor(private http: Http) { }
public cmp = []
  ngOnInit() {
    this.cercaNomiTabelle();
  }
  cercaNomiTabelle(){
    
     this.http.get('http://localhost:8080/nomeTabelle').subscribe(
   (res: Response)=>{const nomiTbs = res.json();
    this.cmp = nomiTbs;

     
     });
   
   }

prendiTb(){
 this.categorieMerceologiche = false;
console.log(this.nometb);
 const body = {nometabella: this.nometb};
 let _url: string = 'http://localhost:8080/cercaSottoMerc';
  
this.http.post(_url,body).subscribe((res: Response)=>{const sottocm = res.json();
 if(sottocm.length != 0){
this.sottocat = sottocm;
this.sottoCategorie = true;
this.indice = 1;}
else{
 this.sottocm = "xxx";
 //this.prendiSottoCm();
 //this.idmaster = true;
 //this.indice= 2;
}
});


}



// select
cambia($event){
  if(this.indice==0){
 
  this.nometb = $event.target.value;
  console.log(this.nometb);
  }else if(this.indice==1){
  this.sottocm = $event.target.value;

  }else if(this.indice==2){
    this.idMaster = $event.target.value;
   
   }else if(this.indice==3){
      this.codiceCol = $event.target.value;
      }
}

}
