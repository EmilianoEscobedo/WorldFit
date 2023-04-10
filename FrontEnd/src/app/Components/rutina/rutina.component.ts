import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RutinaService } from 'src/app/Services/rutina.service';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RutinaComponent implements OnInit  {
  rutinasLista:any;
  series:any;
  ejerciciosLista:any;
  panelOpenState = false;
  
constructor(private datosRutina: RutinaService) { }
  ngOnInit(): void {
    this.datosRutina.obtenerDatos().subscribe((data) => {
     
      this.rutinasLista = data.usuario1.routines;      
     
      
    });
    //this.numero = this.miRutina.dia1[0].series;
    
    this.series =  [...Array(8)];
    
  }
 
  getRutina(rutina:any){
    this.ejerciciosLista =  rutina;
  }
}
