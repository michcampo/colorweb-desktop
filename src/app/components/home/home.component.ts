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
  controlloQualita = false;
  risultatoQualita = false;
  homepage = true;
  nuovoColore = false;
  primoScan;
  secondoScan;
 indice = 0;
 nometb;
 sottocm;
 idMaster;
 codiceCol;
 sottocat;
 codiceR;
 codiceG;
 codiceB;
 codiceR1;
 codiceG1;
 codiceB1;
 codiceR2;
 codiceG2;
 codiceB2;
 deltaE;
 avviso;
 codi;
 note;
 categorieMerceologiche = true;
 sottoCategorie = false;
codiceNeutro = false;
codiceColore= false;
stringacolore;
mostraConfronto = false;
rgbString;
rGb;
data;
rgbScan;
rgb = false;
rgbPres = [];
lab1 = [];
lab2 = [];
rgbNew = [];
codiceNeutroList = [];
public listaCodici = [];
confronto = false;

qualita;

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
inserisci(){
  
  this.homepage = !this.homepage;
  this.nuovoColore = !this.nuovoColore;
}
checkQuality(){
  
  this.homepage = !this.homepage;
  this.controlloQualita = !this.nuovoColore;
}
checkQualityDue(){
  
  this.homepage = !this.homepage;
  this.risultatoQualita = !this.risultatoQualita;
}
checkQualityTre(){
  
  this.controlloQualita = !this.controlloQualita;
  this.risultatoQualita = !this.risultatoQualita;
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
 this.prendiSottoCm();
this.codiceNeutro = true;
 this.indice= 2;
}
});


}

prendiSottoCm(){
  if(this.sottocm.length != 0){
    if(this.sottocm == "xxx"){
      this.sottocm = "";
    }
    this.categorieMerceologiche = false;
    this.sottoCategorie = false;
  const body = {nometabella: this.nometb, sottoCM: this.sottocm};
    let _url: string = 'http://localhost:8080/cercaIDMASTER';
     
  this.http.post(_url,body).subscribe((res: Response)=>{const idmasters = res.json();
  this.codiceNeutroList = idmasters;
  this.codiceNeutro = true;
  this.indice = 2;
  
  });}
  }



  prendiCodiceNeutro(){
    if(this.idMaster.length != 0){
    this.categorieMerceologiche = false;
    this.sottoCategorie = false;
    this.codiceNeutro = false;
  const body = {nometabella: this.nometb, sottoCM: this.sottocm, 'idmaster': this.idMaster};
    let _url: string = 'http://localhost:8080/cercaCOLORE';
     
  this.http.post(_url,body).subscribe((res: Response)=>{const codici = res.json();
    var font;
  for(var i= 0; i<codici.length; i++){
    if(codici[i].h != null){
      codici[i].h = "green";
    }else{
      codici[i].h = "white";
    }
  }
  this.listaCodici = codici;
  this.codiceColore = true;
  this.indice = 3;
  
  });}
  
  }
  

 
prendiColore(){
  if(this.codiceCol.length != 0){
 var colorePrincipale = {nometabella: this.nometb, sottocm: this.sottocm, idmaster: this.idMaster, codice: this.codiceCol};
 
   this.categorieMerceologiche = false;
   this.sottoCategorie = false;
   this.codiceNeutro = false;
   this.codiceColore = false;
   
   const body = {colorePrincipale: colorePrincipale};
   let _url: string = 'http://localhost:8080/cercaHsl';
    
 this.http.post(_url,body).subscribe((res: Response)=>{const codici = res.json();
   var codiceRGB = codici[0].rgb; 
   if(codiceRGB.length != 0){
       this.rgbString = "R: " + codiceRGB[0] + " G: " + codiceRGB[1] + " B: " + codiceRGB[2];
      //da sistemare il rettangolino
      this.rGb = "rgb("+ Math.round(codiceRGB[0]) + ", " +  Math.round(codiceRGB[1]) + "," +  Math.round(codiceRGB[2]) + ")";
       console.log("RGS" + this.rGb);
       this.rgbPres = codiceRGB;
       this.data = codici[0].data;
       this.mostraConfronto = true;
   }
   else{
     this.rgb = true;
   }
 });}
 }
  


negativo(){
  this.codiceR = "";
  this.codiceG = "";
  this.codiceB = "";
  this.rgbScan = ""; 
  this.confronto = false;
  this.deltaE = null;
  this.lab2 = [];
  this.mostraConfronto = true;
}


 prendiDeltaE(value: any){
  this.codiceR = value.codiceR;
  this.codiceG = value.codiceG;
  this.codiceB = value.codiceB;
  
  this.mostraConfronto = false;
  
  var r2 = Number(this.codiceR);
  var g2 = Number(this.codiceG);
  var b2 = Number(this.codiceB);
  
  this.rgbScan = "rgb("+ Math.round(r2) + ", " +  Math.round(g2) + ", " +  Math.round(b2) + ")";
  console.log(typeof(r2));
  this.lab1 = this.rgb2Lab(this.rgbPres[0], this.rgbPres[1], this.rgbPres[2]);
  this.lab2 = this.rgb2Lab(r2, g2, b2);
  this.deltaE = this.getDeltaE(this.lab1, this.lab2);
  this.confronto = true;
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

random_rgb() {
  var o = Math.round, r = Math.random, s = 255;

  var rgb =[o(r()*s),o(r()*s),o(r()*s)];
  return rgb;
}

rgb2Lab(r: number, g: number, b: number){
  var rgb = [r, g, b];
  var X;
  var Y;
  var Z;
  var fx;
  var fy;
  var fz;
  var xr;
  var yr;
  var zr;
  var ls;
  var as;
  var bs;
  var eps = 216.0 / 24389.0;
  var k = 24389.0 / 27.0;
  var Xr = 0.9504;
  var Yr = 1.0;
  var Zr = 1.0888;
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;
  if (r <= 0.04045)
      r = r / 12.92;
  else
      r = Math.pow((r + 0.055) / 1.055, 2.4);
  if (g <= 0.04045)
      g = g / 12.92;
  else
      g = Math.pow((g + 0.055) / 1.055, 2.4);
  if (b <= 0.04045)
      b = b / 12.92;
  else
      b = Math.pow((b + 0.055) / 1.055, 2.4);
  X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  Z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
  var xyz = [X, Y, Z];
  xr = X / Xr;
  yr = Y / Yr;
  zr = Z / Zr;
  if (xr > eps)
      fx = Math.pow(xr, 1 / 3.0);
  else
      fx = ((k * xr + 16.0) / 116.0);
  if (yr > eps)
      fy = Math.pow(yr, 1 / 3.0);
  else
      fy = ((k * yr + 16.0) / 116.0);
  if (zr > eps)
      fz = Math.pow(zr, 1 / 3.0);
  else
      fz = ((k * zr + 16.0) / 116.0);
  ls = (116 * fy) - 16;
  as = 500 * (fx - fy);
  bs = 200 * (fy - fz);
  var hh = ls;
  var ss = as;
  var ll = bs;
  hh = hh * 100;
  ss = ss * 100;
  ll = ll * 100;
  hh = Math.round(hh);
  ss = Math.round(ss);
  ll = Math.round(ll);
  hh = Math.floor(hh);
  ss = Math.floor(ss);
  ll = Math.floor(ll);
  hh = hh / 100;
  ss = ss / 100;
  ll = ll / 100;
  var lss = hh;
  var ass = ss;
  var bss = ll;
  var lab = [lss, ass, bss];
  return lab;
}



getDeltaE(lb, la) {
  var x2 = lb[0] - la[0];
  var y2 = lb[1] - la[1];
  var z2 = lb[2] - la[2];
  var xx = x2;
  var yy = y2;
  var zz = z2;
  var x = Math.pow(xx, 2);
  var y = Math.pow(yy, 2);
  var z = Math.pow(zz, 2);
  var xyz = (x + y + z);
  var de = Math.sqrt(xyz);
  de = de * 10000;
  de = Math.round(de);
  de = Math.floor(de);
  de = de / 10000;
  var dE = de;
  return dE;
}

onSubmit(form: any): void {  
  this.avviso= "";
  console.log("Ciao");
  var param = {"tabella": this.nometb, "sottocm": this.sottocm, "idmaster": this.idMaster, "codiceCol":this.codiceCol};
 console.log("Codice: "+ form.codiceColore+ " R: "+ form.codiceR+ " G:"+ form.codiceG+ " B: "+form.codiceB + "Materiale: "+form.group1);
//fai la funzione per l'inserimento
this.inserisciPelle( form.codiceR, form.codiceG, form.codiceB, form.note, param);
this.avviso = "Il colore  RGB("+form.codiceR+","+form.codiceG+","+form.codiceB+") è stato aggiunto correttamente."
this.codiceR = "";
this.codiceG = "";
this.codiceB = "";
this.codi="";
this.note = "";



}


inserimento(){
  this.avviso= "";
  var param = {"tabella": this.nometb, "sottocm": this.sottocm, "idmaster": this.idMaster, "codiceCol":this.codiceCol};
 console.log(" R: "+ this.codiceR+ " G:"+ this.codiceG+ " B: "+this.codiceB);
 
this.inserisciPelle( this.codiceR, this.codiceG, this.codiceB, this.note, param);
this.avviso = "Il colore  RGB("+this.codiceR+","+this.codiceG+","+this.codiceB+") è stato aggiunto correttamente."
this.codiceR = "";
this.codiceG = "";
this.codiceB = "";
this.codi="";
this.note = "";
this.categorieMerceologiche = true;
this.lab1 = [];
  this.nometb = "";
  this.sottocm = "";
  this.sottoCategorie= false;
  this.codiceNeutro = false;
  this.idMaster ="";
  this.codiceColore = false;
 this.rgb=false;
 this.confronto = false;
 this.mostraConfronto = false;
 this.rgbNew = [];
  this.codiceCol = "";
  this.indice = 0;
  this.confronto = false;
  this.deltaE = null;
  this.lab2 = [];
  this.mostraConfronto = false;

}

idx = 1;


getColoriDaSensore(){
  this.codiceR = "";
this.codiceG = "";
this.codiceB = "";

/*
  this.http.get('http://localhost:8080/sensore')
.subscribe(
(res: Response)=>{const coloreDaScan = res.json();

var r = coloreDaScan.R.toString();
var g = coloreDaScan.G.toString();
var b = coloreDaScan.B.toString();
this.stringacolore= "rgb(" + r + "," + g + "," + b+")";

this.codiceR = r;
this.codiceG = g;
this.codiceB = b;




});*/
var rgbRandom = this.random_rgb();
this.codiceR = rgbRandom[0].toString();
this.codiceG = rgbRandom[1].toString();
this.codiceB = rgbRandom[2].toString();



}


getColori2(){

this.codiceR2 = "";
this.codiceG2 = "";
this.codiceB2 = "";
  var rgbRandom = this.random_rgb();
  this.codiceR2= rgbRandom[0].toString();
  this.codiceG2 = rgbRandom[1].toString();
  this.codiceB2 = rgbRandom[2].toString();  

}


getColori1(){


  this.codiceR1 = "";
  this.codiceG1 = "";
  this.codiceB1 = "";
  var rgbRandom = this.random_rgb();
  this.codiceR1 = rgbRandom[0].toString();
  this.codiceG1 = rgbRandom[1].toString();
  this.codiceB1 = rgbRandom[2].toString();  
  
}

quality(){
  var array1 =[this.codiceR1, this.codiceG1,  this.codiceB1];
  var array2 =[this.codiceR2, this.codiceG2,  this.codiceB2];
  this.qualita = this.getDeltaE(array1, array2);

this.primoScan = "rgb("+ Math.round(this.codiceR1) + ", " +  Math.round(this.codiceG1) + "," +  Math.round(this.codiceB1) + ")";
this.secondoScan = "rgb("+ Math.round(this.codiceR2) + ", " +  Math.round(this.codiceG2) + "," +  Math.round(this.codiceB2) + ")";
this.risultatoQualita = true;
this.controlloQualita = false;
console.log(this.risultatoQualita);
}
  //inserisce il materiale
  inserisciPelle(r1: any, g1: any, b1: any, nota: String, tab: Object) {
    console.log("" + r1 + "" + g1 + "" + b1);
    if (r1 > 255 || g1 > 255 || b1 > 255) {

      return window.alert("Attenzione, sono stati inseriti valori non validi.");
    } else {
      var riga = [];
      const body = { r: r1, g: g1, b: b1, tabella: tab, note: nota, riga: riga };
      let _url: string = 'http://localhost:8080/inserisci';
      return this.http.post(_url, body).subscribe();
    }
  }


indietro(){
  this.codiceCol ="";
  this.indice = 3;
  this.rgb = false;
  this.codiceColore = true;
  this.confronto = false;
  this.mostraConfronto = false;
  this.rgbNew = [];
   this.codiceCol = "";
    
  }

  confronta(){
    
      this.getColoriDaSensore();
      this.rgbNew = [this.codiceR, this.codiceG, this.codiceB];
      
      
    }
    


  reset(){
    this.categorieMerceologiche= true;
    this.lab1 = [];
      this.nometb = "";
      this.sottocm = "";
      this.sottoCategorie= false;
      this.codiceNeutro = false;
      this.idMaster ="";
      this.codiceColore = false;
     this.rgb=false;
     this.confronto = false;
     this.mostraConfronto = false;
     this.rgbNew = [];
      this.codiceCol = "";
      this.indice = 0;
      this.stringacolore = "";
    
    }
}
